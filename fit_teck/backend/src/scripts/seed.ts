import { AppDataSource } from "../config/database";
import { Player } from "../entities/Player";
import { Team } from "../entities/Team";
import { Match } from "../entities/Match";
import { MatchHistory } from "../entities/MatchHistory";

async function seed() {
  await AppDataSource.initialize();

  // Create teams
  const team1 = new Team();
  team1.name = "Manchester United";
  team1.logo = "man-utd-logo.png";
  team1.founded = 1878;
  team1.stadium = "Old Trafford";
  team1.coach = "Erik ten Hag";
  await AppDataSource.manager.save(team1);

  const team2 = new Team();
  team2.name = "Arsenal";
  team2.logo = "arsenal-logo.png";
  team2.founded = 1886;
  team2.stadium = "Emirates Stadium";
  team2.coach = "Mikel Arteta";
  await AppDataSource.manager.save(team2);

  // Create players
  const player1 = new Player();
  player1.name = "Marcus Rodriguez";
  player1.position = "Forward";
  player1.number = 9;
  player1.photo = "https://example.com/photo1.jpg";
  player1.height = "6'2\"";
  player1.weight = "185 lbs";
  player1.age = 26;
  player1.nationality = "Spain";
  player1.goals = 18;
  player1.assists = 7;
  player1.tackles = 12;
  player1.passes = 456;
  player1.rating = 8.5;
  player1.team = team1;
  await AppDataSource.manager.save(player1);

  // Create match history
  const history1 = new MatchHistory();
  history1.date = new Date("2025-11-06");
  history1.opponent = "Arsenal FC";
  history1.goals = 1;
  history1.assists = 1;
  history1.rating = 8.2;
  history1.player = player1;
  await AppDataSource.manager.save(history1);

  console.log("Database seeded successfully!");
  process.exit(0);
}

seed().catch(error => {
  console.error("Error seeding database:", error);
  process.exit(1);
});