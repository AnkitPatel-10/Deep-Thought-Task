import e from "express";
import { getDb } from "../controllers/connectDb.js";
import { ObjectId } from "mongodb";


const router = e.Router();




router.get('/events', async (req, res) => {

    try {
        let eventID = req.query.id;
        let { type, page, limit } = req.query;
        const events = getDb().collection('events');
        if (eventID) {
            const event = await events.findOne({ _id: new ObjectId(eventID) });
            if (!event) {
                return res.status(404).send('Event does not exists for ID: ' + eventID);
            }
            console.log(event);
            return res.status(200).json({ message: "Event found", event });
        }
        if (page) {
            page = parseInt(page);
            limit = parseInt(limit);
            let skip = (page - 1) * limit;
            console.log('Limit: ', limit, ' Skip: ', skip, ' Page: ', page);
            if (type && type === 'latest') {
                const paginatedEvents = await events.find().sort({ schedule: -1 }).skip(skip).limit(limit).toArray();
                return res.json(paginatedEvents);
            }
            const paginatedEvents = await events.find().skip(skip).limit(limit).toArray();
            return res.json(paginatedEvents);
        }
        const allEvents = await events.find().toArray();
        console.log(allEvents);
        return res.status(200).json(allEvents);

    } catch (error) {
        return res.status(400).send("Error in getting events: " + error.message);
    }
});

router.post('/events', async (req, res) => {
    const event = req.body;
    try {
        if (!event) {
            return res.status(400).send('Event data is required to create an event');
        }

        const events = getDb().collection('events');
        console.log({...event});
        
        const result = await events.insertOne({ ...event });
        

        if (!result.acknowledged) {
            throw new Error('Error in inserting event to the database');
        }

        return res.status(201).send("Event created Successfully! \nEvent ID: " + result.insertedId);

    } catch (error) {
        return res.status(500).send('Error in creating an event : ' + error.message);
    }


});

router.get('/events/:id', async (req, res) => {
    try {
        let eventId = req.params.id;
        if (!eventId) {
            return res.status(400).send('Event ID is required in path parameters');
        }

        const events = getDb().collection('events');
        const event = await events.findOne({ _id: new ObjectId(eventId) });
        if (!event) {
            return res.status(404).send('Event does not exists for ID: ' + eventId);
        }

        return res.status(201).json(event);

    } catch (error) {
        res.status(500).send('Error : ' + error.message);
    }
});

router.put('/events/:id', async (req, res) => {
    try {

        const eventId = req.params.id;
        if (!eventId) {
            return res.status(400).send('Event ID is required in path parameters to update an event');
        }

        const { name, tagline, schedule, description, files, moderator, category, sub_category, rigor_rank } = req.body;
         
        const events = getDb().collection('events');
        const updatedEvent = await events.updateOne(
            { _id: new ObjectId(eventId) },
            { $set: { name, tagline, schedule, description, moderator, category, sub_category, rigor_rank, files } }
        );

        if (updatedEvent.matchedCount === 0) {
            return res.status(404).send('Event not found for ID: ' + eventId);
        }
        return res.status(200).send(`Event with ID: ${eventId} updated successfully.`);
    } catch (error) {
        return res.status(500).send('Error in updating an event : ' + error.message);
    }
});

router.delete('/events/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        if (!eventId) {
            return res.status(400).send('Event ID is required in path parameters to delete an event');
        }
        console.log('Deleting Event ID:', eventId);
        const events = getDb().collection('events');
        const result = await events.deleteOne({ _id: new ObjectId(eventId) });
        console.log(result);
        if (result.deletedCount === 0) {
            return res.status(404).send('Event not found for ID: ' + eventId);
        }
        res.status(200).send(`Event with ID: ${eventId} deleted successfully.`);

    } catch (error) {
        return res.status(500).send('Error in deleting an event : ' + error.message);
    }

});

export default router;

// type:"event"
// uid:18 (user id)
// name: Name of the event
// tagline: A proper tag-line for the event
// schedule: (Date + time) Timestamp
// description: String
// files[image]: Image file (File upload)
// moderator: A user who is going to host
// category: Category of the event
// sub_category: Sub category
// rigor_rank: Integer value
// attendees: Array of user Id's who is attending the event
