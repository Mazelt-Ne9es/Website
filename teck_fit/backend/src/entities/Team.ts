import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Player } from "./Player";
import { Match } from "./Match";

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Player, player => player.team)
  players: Player[];

  @OneToMany(() => Match, match => match.homeTeam)
  homeMatches: Match[];

  @OneToMany(() => Match, match => match.awayTeam)
  awayMatches: Match[];

  @Column()
  logo: string;

  @Column()
  founded: number;

  @Column()
  stadium: string;

  @Column()
  coach: string;
}