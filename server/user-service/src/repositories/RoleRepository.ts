import { supabase } from "../config/supabase";

class RoleRepository {
	static async getAll() {
		const { data, error } = await supabase.from("roles").select("*");
		if (error) throw error.message;
		return data;
	}

	static async getById(id: any) {
		const { data, error } = await supabase
			.from("roles")
			.select("*")
			.eq("id", id)
			.single();
		if (error) throw error.message;
		return data;
	}

	static async create(role: any) {
		const { data, error } = await supabase
			.from("roles")
			.insert([role])
			.single();
		if (error) throw error.message;
		return data;
	}

	static async update(id: any, updates: any) {
		const { data, error } = await supabase
			.from("roles")
			.update(updates)
			.eq("id", id)
			.single();
		if (error) throw error.message;
		return data;
	}

	static async delete(id: any) {
		const { error } = await supabase.from("roles").delete().eq("id", id);
		if (error) throw error.message;
	}
}

export { RoleRepository };
