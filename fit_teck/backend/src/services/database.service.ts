import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Player } from "../entities/Player";
import { Match } from "../entities/Match";
import { Team } from "../entities/Team";
import { MatchHistory } from "../entities/MatchHistory";

export class DatabaseService {
  private playerRepository: Repository<Player>;
  private matchRepository: Repository<Match>;
  private teamRepository: Repository<Team>;
  private matchHistoryRepository: Repository<MatchHistory>;

  constructor() {
    this.playerRepository = AppDataSource.getRepository(Player);
    this.matchRepository = AppDataSource.getRepository(Match);
    this.teamRepository = AppDataSource.getRepository(Team);
    this.matchHistoryRepository = AppDataSource.getRepository(MatchHistory);
  }

  // Players
  async getAllPlayers(): Promise<Player[]> {
    return this.playerRepository.find({
      relations: ["team", "matchHistory"]
    });
  }

  async getPlayerById(id: number): Promise<Player | null> {
    return this.playerRepository.findOne({
      where: { id },
      relations: ["team", "matchHistory"]
    });
  }

  async createPlayer(playerData: Partial<Player>): Promise<Player> {
    const player = this.playerRepository.create(playerData);
    return this.playerRepository.save(player);
  }

  // Teams
  async getAllTeams(): Promise<Team[]> {
    return this.teamRepository.find({
      relations: ["players"]
    });
  }

  async getTeamById(id: number): Promise<Team | null> {
    return this.teamRepository.findOne({
      where: { id },
      relations: ["players", "homeMatches", "awayMatches"]
    });
  }

  // Matches
  async getAllMatches(): Promise<Match[]> {
    return this.matchRepository.find({
      relations: ["homeTeam", "awayTeam"]
    });
  }

  async getMatchById(id: number): Promise<Match | null> {
    return this.matchRepository.findOne({
      where: { id },
      relations: ["homeTeam", "awayTeam"]
    });
  }

  // Match History
  async getPlayerMatchHistory(playerId: number): Promise<MatchHistory[]> {
    return this.matchHistoryRepository.find({
      where: { player: { id: playerId } },
      order: { date: "DESC" }
    });
  }
}

export const databaseService = new DatabaseService();