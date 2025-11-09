import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Player } from "./Player";

@Entity()
export class MatchHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  date: Date;

  @Column()
  opponent: string;

  @Column()
  goals: number;

  @Column()
  assists: number;

  @Column("decimal", { precision: 3, scale: 1 })
  rating: number;

  @ManyToOne(() => Player, player => player.matchHistory)
  player: Player;
}