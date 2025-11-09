import { DataSource } from "typeorm";
import { Player } from "../entities/Player";
import { Match } from "../entities/Match";
import { Team } from "../entities/Team";
import { Competition } from "../entities/Competition";
import { Stats } from "../entities/Stats";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "football_analytics",
  synchronize: true, // En développement seulement
  logging: true,
  entities: [Player, Match, Team, Competition, Stats],
  subscribers: [],
  migrations: [],
});