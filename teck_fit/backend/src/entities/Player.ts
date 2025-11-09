import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Team } from "./Team";
import { Match } from "./Match";
import { MatchHistory } from "./MatchHistory";

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  position: string;

  @Column()
  number: number;

  @Column()
  photo: string;

  @Column()
  height: string;

  @Column()
  weight: string;

  @Column()
  age: number;

  @Column()
  nationality: string;

  @Column()
  goals: number;

  @Column()
  assists: number;

  @Column()
  tackles: number;

  @Column()
  passes: number;

  @Column("decimal", { precision: 3, scale: 1 })
  rating: number;

  @ManyToOne(() => Team, team => team.players)
  team: Team;

  @OneToMany(() => MatchHistory, matchHistory => matchHistory.player)
  matchHistory: MatchHistory[];
}