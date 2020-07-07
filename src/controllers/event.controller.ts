import Event from "../db/models/Event.model";
import { validate } from "../validations/index.validation";
import { eventInput } from "../validations/event.validation";
import userController from "./user.Controller";
import User from "../db/models/User.model";
// import chalk from "chalk";

class EventController {
  public async createEvent(eventInfo: any, id: string) {
    try {
      let eventValidation = await validate(eventInput, eventInfo);
      if (Array.isArray(eventValidation))
        return { success: false, errors: eventValidation };

      const newEvent = new Event(eventInfo);
      const user = (await userController.getUser({ _id: id })) as any;

      user.events.push(newEvent);

      await user.save();
      await newEvent.save();
      return { success: true, event: newEvent };
    } catch (e) {
      throw e;
    }
  }
  public async updateEvent(id: string, updateObj: any) {
    try {
      const updated = await Event.findByIdAndUpdate(id, updateObj);

      return { success: true, event: updated };
    } catch (e) {
      throw e;
    }
  }
  public async deleteEvent(eventId: string, userId: string) {
    try {
      const event = await Event.findByIdAndDelete(eventId);
      const user = await User.updateOne(
        { _id: userId },
        { $pull: { events: { _id: eventId } } }
      );

      console.log(user);
      return { success: true, event };
    } catch (e) {
      throw e;
    }
  }
  public async getEvent(id: string) {
    try {
      const event = await Event.findById(id).populate("comments.user_id");
      if (!event)
        return {
          success: false,
          errors: [
            { path: `Get event`, msg: `No event found with this id: ${id}` },
          ],
        };

      return { success: true, event };
    } catch (e) {
      throw e;
    }
  }
  public async searchEvent(searchTerm: string) {
    try {
      const events = await Event.find({
        $text: { $search: `\"${searchTerm}\"` },
      });

      if (!events)
        return {
          success: false,
          errors: [
            {
              path: `Get event`,
              msg: `No event found with this term: ${searchTerm}`,
            },
          ],
        };

      return { success: true, events };
    } catch (e) {
      throw e;
    }
  }
  public async getAllEvents() {
    try {
      return { success: true, events: await Event.find() };
    } catch (e) {
      throw e;
    }
  }
  public async addComment(eventId: string, comment: string, userId: string) {
    try {
      const user = (await userController.getUser({ _id: userId })) as any;
      const { success, errors, event } = await this.getEvent(eventId);

      if (!success) return { success, errors };
      event?.comments.push({ comment, user_id: user });

      await event?.save();

      return { success: true, event };
    } catch (e) {
      throw e;
    }
  }
  public async getEventsBasedOnAUser() {}
  public async getEventsInAnArea() {}
}

export default new EventController();
