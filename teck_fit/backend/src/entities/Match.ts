import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Team } from "./Team";

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp" })
  date: Date;

  @ManyToOne(() => Team, team => team.homeMatches)
  homeTeam: Team;

  @ManyToOne(() => Team, team => team.awayMatches)
  awayTeam: Team;

  @Column()
  homeScore: number;

  @Column()
  awayScore: number;

  @Column("jsonb", { nullable: true })
  stats: {
    possession: number;
    shots: number;
    shotsOnTarget: number;
    corners: number;
    fouls: number;
  };

  @Column("jsonb", { nullable: true })
  events: {
    type: string;
    minute: number;
    player: number;
    team: number;
  }[];
}