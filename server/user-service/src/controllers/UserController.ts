import { UserService } from "../services/UserService";

class UserController {
  static async index({ body, set }: any) {
   /*try {
      const users = await UserService.find();
      return set.json(users);
    } catch (error) {
      console.error(error);
      return set.status(500).json({ error: "Internal server error" });
    }*/
  }

  static async show({ body, set }: any) {
    /*const { id } = body.params;

    try {
      const user = await UserService.findOne({ _id: id });

      if (!user) {
        return set.status(404).json({ error: "User not found" });
      }

      return set.json(user);
    } catch (error) {
      console.error(error);
      return set.status(500).json({ error: "Internal server error" });
    }*/
  }

  static async store({ body, set }: any) {
    /*const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      billingInfo,
    } = req.body;

    try {
      const user = await UserService.create({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        address,
        billingInfo,
      });

      return set.status(201).json(user);
    } catch (error) {
      console.error(error);
      return set.status(500).json({ error: "Internal server error" });
    }*/
  }

  static async update({ body, set }: any) {
    /*const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    try {
      const user = await UserService.findOne({ _id: id });

      if (!user) {
        return set.status(404).json({ error: "User not found" });
      }

      await UserService.updateOne({
        firstName,
        lastName,
        email,
      });

      return set.json(user);
    } catch (error) {
      console.error(error);
      return set.status(500).json({ error: "Internal server error" });
    }*/
  }

  static async destroy({ body, set }: any) {
    /*try {
      const user = await UserService.findOneAndDelete({ _id: req.params.id });

      if (!user) {
        set.status(404).json({ error: "User not found" });
        return;
      }

      return set.status(204).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      return set.status(500).json({ error: "Internal server error" });
    }*/
  }
}

export default UserController
