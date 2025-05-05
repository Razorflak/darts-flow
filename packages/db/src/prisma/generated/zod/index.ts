import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const MatchScalarFieldEnumSchema = z.enum(['id','matchNumber','teamAId','teamBId','scoreTeamA','scoreTeamB','winnerId','startTime','endTime','location','status','createdAt','updatedAt']);

export const TeamScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const PlayerScalarFieldEnumSchema = z.enum(['id','name','teamId','createdAt','updatedAt']);

export const EventScalarFieldEnumSchema = z.enum(['id','name','startDate','endDate','location','createdAt','updatedAt']);

export const TournamentScalarFieldEnumSchema = z.enum(['id','eventId','name','startDate','endDate','createdAt','updatedAt']);

export const TeamTournamentScalarFieldEnumSchema = z.enum(['id','tournamentId','teamId','seed','createdAt','updatedAt']);

export const PhaseScalarFieldEnumSchema = z.enum(['id','tournamentId','name','type','previousPhaseId','nextPhaseId']);

export const RoundScalarFieldEnumSchema = z.enum(['id','phaseId','name','roundNumber']);

export const MatchRoundScalarFieldEnumSchema = z.enum(['id','numRoundMatch','roundId','matchId']);

export const RoundTeamScalarFieldEnumSchema = z.enum(['id','teamId','roundId']);

export const UserScalarFieldEnumSchema = z.enum(['id','firstName','lastName','userName','password','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const MatchStatusSchema = z.enum(['PENDING','IN_PROGRESS','COMPLETED','CANCELLED']);

export type MatchStatusType = `${z.infer<typeof MatchStatusSchema>}`

export const PhaseTypeSchema = z.enum(['GROUP_STAGE','SINGLE_ELIMINATION_BRACKET']);

export type PhaseTypeType = `${z.infer<typeof PhaseTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// MATCH SCHEMA
/////////////////////////////////////////

export const MatchSchema = z.object({
  status: MatchStatusSchema,
  id: z.string().cuid(),
  matchNumber: z.number().int().nullable(),
  teamAId: z.string().nullable(),
  teamBId: z.string().nullable(),
  scoreTeamA: z.number().int().nullable(),
  scoreTeamB: z.number().int().nullable(),
  winnerId: z.string().nullable(),
  startTime: z.coerce.date().nullable(),
  endTime: z.coerce.date().nullable(),
  location: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Match = z.infer<typeof MatchSchema>

/////////////////////////////////////////
// TEAM SCHEMA
/////////////////////////////////////////

export const TeamSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Team = z.infer<typeof TeamSchema>

/////////////////////////////////////////
// PLAYER SCHEMA
/////////////////////////////////////////

export const PlayerSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  teamId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Player = z.infer<typeof PlayerSchema>

/////////////////////////////////////////
// EVENT SCHEMA
/////////////////////////////////////////

export const EventSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  startDate: z.coerce.date().nullable(),
  endDate: z.coerce.date().nullable(),
  location: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Event = z.infer<typeof EventSchema>

/////////////////////////////////////////
// TOURNAMENT SCHEMA
/////////////////////////////////////////

export const TournamentSchema = z.object({
  id: z.string().cuid(),
  eventId: z.string(),
  name: z.string(),
  startDate: z.coerce.date().nullable(),
  endDate: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Tournament = z.infer<typeof TournamentSchema>

/////////////////////////////////////////
// TEAM TOURNAMENT SCHEMA
/////////////////////////////////////////

export const TeamTournamentSchema = z.object({
  id: z.string().cuid(),
  tournamentId: z.string(),
  teamId: z.string(),
  seed: z.number().int().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type TeamTournament = z.infer<typeof TeamTournamentSchema>

/////////////////////////////////////////
// PHASE SCHEMA
/////////////////////////////////////////

export const PhaseSchema = z.object({
  type: PhaseTypeSchema,
  id: z.string().uuid(),
  tournamentId: z.string(),
  name: z.string(),
  previousPhaseId: z.string().nullable(),
  nextPhaseId: z.string().nullable(),
})

export type Phase = z.infer<typeof PhaseSchema>

/////////////////////////////////////////
// ROUND SCHEMA
/////////////////////////////////////////

export const RoundSchema = z.object({
  id: z.string().uuid(),
  phaseId: z.string(),
  name: z.string().nullable(),
  roundNumber: z.number().int().nullable(),
})

export type Round = z.infer<typeof RoundSchema>

/////////////////////////////////////////
// MATCH ROUND SCHEMA
/////////////////////////////////////////

export const MatchRoundSchema = z.object({
  id: z.string().cuid(),
  numRoundMatch: z.number().int(),
  roundId: z.string(),
  matchId: z.string(),
})

export type MatchRound = z.infer<typeof MatchRoundSchema>

/////////////////////////////////////////
// ROUND TEAM SCHEMA
/////////////////////////////////////////

export const RoundTeamSchema = z.object({
  id: z.string().cuid(),
  teamId: z.string(),
  roundId: z.string(),
})

export type RoundTeam = z.infer<typeof RoundTeamSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  firstName: z.string(),
  lastName: z.string(),
  userName: z.string(),
  password: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// MATCH
//------------------------------------------------------

export const MatchIncludeSchema: z.ZodType<Prisma.MatchInclude> = z.object({
  teamA: z.union([z.boolean(),z.lazy(() => TeamArgsSchema)]).optional(),
  teamB: z.union([z.boolean(),z.lazy(() => TeamArgsSchema)]).optional(),
  winner: z.union([z.boolean(),z.lazy(() => TeamArgsSchema)]).optional(),
  round: z.union([z.boolean(),z.lazy(() => MatchRoundArgsSchema)]).optional(),
}).strict()

export const MatchArgsSchema: z.ZodType<Prisma.MatchDefaultArgs> = z.object({
  select: z.lazy(() => MatchSelectSchema).optional(),
  include: z.lazy(() => MatchIncludeSchema).optional(),
}).strict();

export const MatchSelectSchema: z.ZodType<Prisma.MatchSelect> = z.object({
  id: z.boolean().optional(),
  matchNumber: z.boolean().optional(),
  teamAId: z.boolean().optional(),
  teamBId: z.boolean().optional(),
  scoreTeamA: z.boolean().optional(),
  scoreTeamB: z.boolean().optional(),
  winnerId: z.boolean().optional(),
  startTime: z.boolean().optional(),
  endTime: z.boolean().optional(),
  location: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  teamA: z.union([z.boolean(),z.lazy(() => TeamArgsSchema)]).optional(),
  teamB: z.union([z.boolean(),z.lazy(() => TeamArgsSchema)]).optional(),
  winner: z.union([z.boolean(),z.lazy(() => TeamArgsSchema)]).optional(),
  round: z.union([z.boolean(),z.lazy(() => MatchRoundArgsSchema)]).optional(),
}).strict()

// TEAM
//------------------------------------------------------

export const TeamIncludeSchema: z.ZodType<Prisma.TeamInclude> = z.object({
  players: z.union([z.boolean(),z.lazy(() => PlayerFindManyArgsSchema)]).optional(),
  teamInTournaments: z.union([z.boolean(),z.lazy(() => TeamTournamentFindManyArgsSchema)]).optional(),
  matchesTeamA: z.union([z.boolean(),z.lazy(() => MatchFindManyArgsSchema)]).optional(),
  matchesTeamB: z.union([z.boolean(),z.lazy(() => MatchFindManyArgsSchema)]).optional(),
  wonMatches: z.union([z.boolean(),z.lazy(() => MatchFindManyArgsSchema)]).optional(),
  roundTeam: z.union([z.boolean(),z.lazy(() => RoundTeamFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TeamCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TeamArgsSchema: z.ZodType<Prisma.TeamDefaultArgs> = z.object({
  select: z.lazy(() => TeamSelectSchema).optional(),
  include: z.lazy(() => TeamIncludeSchema).optional(),
}).strict();

export const TeamCountOutputTypeArgsSchema: z.ZodType<Prisma.TeamCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TeamCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TeamCountOutputTypeSelectSchema: z.ZodType<Prisma.TeamCountOutputTypeSelect> = z.object({
  players: z.boolean().optional(),
  teamInTournaments: z.boolean().optional(),
  matchesTeamA: z.boolean().optional(),
  matchesTeamB: z.boolean().optional(),
  wonMatches: z.boolean().optional(),
  roundTeam: z.boolean().optional(),
}).strict();

export const TeamSelectSchema: z.ZodType<Prisma.TeamSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  players: z.union([z.boolean(),z.lazy(() => PlayerFindManyArgsSchema)]).optional(),
  teamInTournaments: z.union([z.boolean(),z.lazy(() => TeamTournamentFindManyArgsSchema)]).optional(),
  matchesTeamA: z.union([z.boolean(),z.lazy(() => MatchFindManyArgsSchema)]).optional(),
  matchesTeamB: z.union([z.boolean(),z.lazy(() => MatchFindManyArgsSchema)]).optional(),
  wonMatches: z.union([z.boolean(),z.lazy(() => MatchFindManyArgsSchema)]).optional(),
  roundTeam: z.union([z.boolean(),z.lazy(() => RoundTeamFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TeamCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PLAYER
//------------------------------------------------------

export const PlayerIncludeSchema: z.ZodType<Prisma.PlayerInclude> = z.object({
  team: z.union([z.boolean(),z.lazy(() => TeamArgsSchema)]).optional(),
}).strict()

export const PlayerArgsSchema: z.ZodType<Prisma.PlayerDefaultArgs> = z.object({
  select: z.lazy(() => PlayerSelectSchema).optional(),
  include: z.lazy(() => PlayerIncludeSchema).optional(),
}).strict();

export const PlayerSelectSchema: z.ZodType<Prisma.PlayerSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  teamId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  team: z.union([z.boolean(),z.lazy(() => TeamArgsSchema)]).optional(),
}).strict()

// EVENT
//------------------------------------------------------

export const EventIncludeSchema: z.ZodType<Prisma.EventInclude> = z.object({
  tournaments: z.union([z.boolean(),z.lazy(() => TournamentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EventCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const EventArgsSchema: z.ZodType<Prisma.EventDefaultArgs> = z.object({
  select: z.lazy(() => EventSelectSchema).optional(),
  include: z.lazy(() => EventIncludeSchema).optional(),
}).strict();

export const EventCountOutputTypeArgsSchema: z.ZodType<Prisma.EventCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => EventCountOutputTypeSelectSchema).nullish(),
}).strict();

export const EventCountOutputTypeSelectSchema: z.ZodType<Prisma.EventCountOutputTypeSelect> = z.object({
  tournaments: z.boolean().optional(),
}).strict();

export const EventSelectSchema: z.ZodType<Prisma.EventSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  startDate: z.boolean().optional(),
  endDate: z.boolean().optional(),
  location: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  tournaments: z.union([z.boolean(),z.lazy(() => TournamentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => EventCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TOURNAMENT
//------------------------------------------------------

export const TournamentIncludeSchema: z.ZodType<Prisma.TournamentInclude> = z.object({
  event: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
  phases: z.union([z.boolean(),z.lazy(() => PhaseFindManyArgsSchema)]).optional(),
  teams: z.union([z.boolean(),z.lazy(() => TeamTournamentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TournamentCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TournamentArgsSchema: z.ZodType<Prisma.TournamentDefaultArgs> = z.object({
  select: z.lazy(() => TournamentSelectSchema).optional(),
  include: z.lazy(() => TournamentIncludeSchema).optional(),
}).strict();

export const TournamentCountOutputTypeArgsSchema: z.ZodType<Prisma.TournamentCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TournamentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TournamentCountOutputTypeSelectSchema: z.ZodType<Prisma.TournamentCountOutputTypeSelect> = z.object({
  phases: z.boolean().optional(),
  teams: z.boolean().optional(),
}).strict();

export const TournamentSelectSchema: z.ZodType<Prisma.TournamentSelect> = z.object({
  id: z.boolean().optional(),
  eventId: z.boolean().optional(),
  name: z.boolean().optional(),
  startDate: z.boolean().optional(),
  endDate: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  event: z.union([z.boolean(),z.lazy(() => EventArgsSchema)]).optional(),
  phases: z.union([z.boolean(),z.lazy(() => PhaseFindManyArgsSchema)]).optional(),
  teams: z.union([z.boolean(),z.lazy(() => TeamTournamentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TournamentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TEAM TOURNAMENT
//------------------------------------------------------

export const TeamTournamentIncludeSchema: z.ZodType<Prisma.TeamTournamentInclude> = z.object({
  tournament: z.union([z.boolean(),z.lazy(() => TournamentArgsSchema)]).optional(),
  team: z.union([z.boolean(),z.lazy(() => TeamArgsSchema)]).optional(),
}).strict()

export const TeamTournamentArgsSchema: z.ZodType<Prisma.TeamTournamentDefaultArgs> = z.object({
  select: z.lazy(() => TeamTournamentSelectSchema).optional(),
  include: z.lazy(() => TeamTournamentIncludeSchema).optional(),
}).strict();

export const TeamTournamentSelectSchema: z.ZodType<Prisma.TeamTournamentSelect> = z.object({
  id: z.boolean().optional(),
  tournamentId: z.boolean().optional(),
  teamId: z.boolean().optional(),
  seed: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  tournament: z.union([z.boolean(),z.lazy(() => TournamentArgsSchema)]).optional(),
  team: z.union([z.boolean(),z.lazy(() => TeamArgsSchema)]).optional(),
}).strict()

// PHASE
//------------------------------------------------------

export const PhaseIncludeSchema: z.ZodType<Prisma.PhaseInclude> = z.object({
  tournament: z.union([z.boolean(),z.lazy(() => TournamentArgsSchema)]).optional(),
  rounds: z.union([z.boolean(),z.lazy(() => RoundFindManyArgsSchema)]).optional(),
  previousPhase: z.union([z.boolean(),z.lazy(() => PhaseArgsSchema)]).optional(),
  nextPhaseRelation: z.union([z.boolean(),z.lazy(() => PhaseArgsSchema)]).optional(),
  nextPhase: z.union([z.boolean(),z.lazy(() => PhaseArgsSchema)]).optional(),
  PreviousPhaseRelation: z.union([z.boolean(),z.lazy(() => PhaseArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PhaseCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PhaseArgsSchema: z.ZodType<Prisma.PhaseDefaultArgs> = z.object({
  select: z.lazy(() => PhaseSelectSchema).optional(),
  include: z.lazy(() => PhaseIncludeSchema).optional(),
}).strict();

export const PhaseCountOutputTypeArgsSchema: z.ZodType<Prisma.PhaseCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PhaseCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PhaseCountOutputTypeSelectSchema: z.ZodType<Prisma.PhaseCountOutputTypeSelect> = z.object({
  rounds: z.boolean().optional(),
}).strict();

export const PhaseSelectSchema: z.ZodType<Prisma.PhaseSelect> = z.object({
  id: z.boolean().optional(),
  tournamentId: z.boolean().optional(),
  name: z.boolean().optional(),
  type: z.boolean().optional(),
  previousPhaseId: z.boolean().optional(),
  nextPhaseId: z.boolean().optional(),
  tournament: z.union([z.boolean(),z.lazy(() => TournamentArgsSchema)]).optional(),
  rounds: z.union([z.boolean(),z.lazy(() => RoundFindManyArgsSchema)]).optional(),
  previousPhase: z.union([z.boolean(),z.lazy(() => PhaseArgsSchema)]).optional(),
  nextPhaseRelation: z.union([z.boolean(),z.lazy(() => PhaseArgsSchema)]).optional(),
  nextPhase: z.union([z.boolean(),z.lazy(() => PhaseArgsSchema)]).optional(),
  PreviousPhaseRelation: z.union([z.boolean(),z.lazy(() => PhaseArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PhaseCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ROUND
//------------------------------------------------------

export const RoundIncludeSchema: z.ZodType<Prisma.RoundInclude> = z.object({
  phase: z.union([z.boolean(),z.lazy(() => PhaseArgsSchema)]).optional(),
  matches: z.union([z.boolean(),z.lazy(() => MatchRoundFindManyArgsSchema)]).optional(),
  roundTeam: z.union([z.boolean(),z.lazy(() => RoundTeamFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RoundCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RoundArgsSchema: z.ZodType<Prisma.RoundDefaultArgs> = z.object({
  select: z.lazy(() => RoundSelectSchema).optional(),
  include: z.lazy(() => RoundIncludeSchema).optional(),
}).strict();

export const RoundCountOutputTypeArgsSchema: z.ZodType<Prisma.RoundCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RoundCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RoundCountOutputTypeSelectSchema: z.ZodType<Prisma.RoundCountOutputTypeSelect> = z.object({
  matches: z.boolean().optional(),
  roundTeam: z.boolean().optional(),
}).strict();

export const RoundSelectSchema: z.ZodType<Prisma.RoundSelect> = z.object({
  id: z.boolean().optional(),
  phaseId: z.boolean().optional(),
  name: z.boolean().optional(),
  roundNumber: z.boolean().optional(),
  phase: z.union([z.boolean(),z.lazy(() => PhaseArgsSchema)]).optional(),
  matches: z.union([z.boolean(),z.lazy(() => MatchRoundFindManyArgsSchema)]).optional(),
  roundTeam: z.union([z.boolean(),z.lazy(() => RoundTeamFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RoundCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MATCH ROUND
//------------------------------------------------------

export const MatchRoundIncludeSchema: z.ZodType<Prisma.MatchRoundInclude> = z.object({
  round: z.union([z.boolean(),z.lazy(() => RoundArgsSchema)]).optional(),
  match: z.union([z.boolean(),z.lazy(() => MatchArgsSchema)]).optional(),
}).strict()

export const MatchRoundArgsSchema: z.ZodType<Prisma.MatchRoundDefaultArgs> = z.object({
  select: z.lazy(() => MatchRoundSelectSchema).optional(),
  include: z.lazy(() => MatchRoundIncludeSchema).optional(),
}).strict();

export const MatchRoundSelectSchema: z.ZodType<Prisma.MatchRoundSelect> = z.object({
  id: z.boolean().optional(),
  numRoundMatch: z.boolean().optional(),
  roundId: z.boolean().optional(),
  matchId: z.boolean().optional(),
  round: z.union([z.boolean(),z.lazy(() => RoundArgsSchema)]).optional(),
  match: z.union([z.boolean(),z.lazy(() => MatchArgsSchema)]).optional(),
}).strict()

// ROUND TEAM
//------------------------------------------------------

export const RoundTeamIncludeSchema: z.ZodType<Prisma.RoundTeamInclude> = z.object({
  team: z.union([z.boolean(),z.lazy(() => TeamArgsSchema)]).optional(),
  round: z.union([z.boolean(),z.lazy(() => RoundArgsSchema)]).optional(),
}).strict()

export const RoundTeamArgsSchema: z.ZodType<Prisma.RoundTeamDefaultArgs> = z.object({
  select: z.lazy(() => RoundTeamSelectSchema).optional(),
  include: z.lazy(() => RoundTeamIncludeSchema).optional(),
}).strict();

export const RoundTeamSelectSchema: z.ZodType<Prisma.RoundTeamSelect> = z.object({
  id: z.boolean().optional(),
  teamId: z.boolean().optional(),
  roundId: z.boolean().optional(),
  team: z.union([z.boolean(),z.lazy(() => TeamArgsSchema)]).optional(),
  round: z.union([z.boolean(),z.lazy(() => RoundArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  userName: z.boolean().optional(),
  password: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const MatchWhereInputSchema: z.ZodType<Prisma.MatchWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MatchWhereInputSchema),z.lazy(() => MatchWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MatchWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MatchWhereInputSchema),z.lazy(() => MatchWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  matchNumber: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  teamAId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  teamBId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scoreTeamA: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  scoreTeamB: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  winnerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  startTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  endTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumMatchStatusFilterSchema),z.lazy(() => MatchStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  teamA: z.union([ z.lazy(() => TeamNullableScalarRelationFilterSchema),z.lazy(() => TeamWhereInputSchema) ]).optional().nullable(),
  teamB: z.union([ z.lazy(() => TeamNullableScalarRelationFilterSchema),z.lazy(() => TeamWhereInputSchema) ]).optional().nullable(),
  winner: z.union([ z.lazy(() => TeamNullableScalarRelationFilterSchema),z.lazy(() => TeamWhereInputSchema) ]).optional().nullable(),
  round: z.union([ z.lazy(() => MatchRoundNullableScalarRelationFilterSchema),z.lazy(() => MatchRoundWhereInputSchema) ]).optional().nullable(),
}).strict();

export const MatchOrderByWithRelationInputSchema: z.ZodType<Prisma.MatchOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  matchNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  teamAId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  teamBId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scoreTeamA: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scoreTeamB: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  winnerId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  startTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  teamA: z.lazy(() => TeamOrderByWithRelationInputSchema).optional(),
  teamB: z.lazy(() => TeamOrderByWithRelationInputSchema).optional(),
  winner: z.lazy(() => TeamOrderByWithRelationInputSchema).optional(),
  round: z.lazy(() => MatchRoundOrderByWithRelationInputSchema).optional()
}).strict();

export const MatchWhereUniqueInputSchema: z.ZodType<Prisma.MatchWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => MatchWhereInputSchema),z.lazy(() => MatchWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MatchWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MatchWhereInputSchema),z.lazy(() => MatchWhereInputSchema).array() ]).optional(),
  matchNumber: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  teamAId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  teamBId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scoreTeamA: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  scoreTeamB: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  winnerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  startTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  endTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumMatchStatusFilterSchema),z.lazy(() => MatchStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  teamA: z.union([ z.lazy(() => TeamNullableScalarRelationFilterSchema),z.lazy(() => TeamWhereInputSchema) ]).optional().nullable(),
  teamB: z.union([ z.lazy(() => TeamNullableScalarRelationFilterSchema),z.lazy(() => TeamWhereInputSchema) ]).optional().nullable(),
  winner: z.union([ z.lazy(() => TeamNullableScalarRelationFilterSchema),z.lazy(() => TeamWhereInputSchema) ]).optional().nullable(),
  round: z.union([ z.lazy(() => MatchRoundNullableScalarRelationFilterSchema),z.lazy(() => MatchRoundWhereInputSchema) ]).optional().nullable(),
}).strict());

export const MatchOrderByWithAggregationInputSchema: z.ZodType<Prisma.MatchOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  matchNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  teamAId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  teamBId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scoreTeamA: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scoreTeamB: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  winnerId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  startTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endTime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MatchCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MatchAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MatchMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MatchMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MatchSumOrderByAggregateInputSchema).optional()
}).strict();

export const MatchScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MatchScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MatchScalarWhereWithAggregatesInputSchema),z.lazy(() => MatchScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MatchScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MatchScalarWhereWithAggregatesInputSchema),z.lazy(() => MatchScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  matchNumber: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  teamAId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  teamBId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scoreTeamA: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  scoreTeamB: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  winnerId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  startTime: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  endTime: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  location: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumMatchStatusWithAggregatesFilterSchema),z.lazy(() => MatchStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TeamWhereInputSchema: z.ZodType<Prisma.TeamWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TeamWhereInputSchema),z.lazy(() => TeamWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TeamWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TeamWhereInputSchema),z.lazy(() => TeamWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  players: z.lazy(() => PlayerListRelationFilterSchema).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentListRelationFilterSchema).optional(),
  matchesTeamA: z.lazy(() => MatchListRelationFilterSchema).optional(),
  matchesTeamB: z.lazy(() => MatchListRelationFilterSchema).optional(),
  wonMatches: z.lazy(() => MatchListRelationFilterSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamListRelationFilterSchema).optional()
}).strict();

export const TeamOrderByWithRelationInputSchema: z.ZodType<Prisma.TeamOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  players: z.lazy(() => PlayerOrderByRelationAggregateInputSchema).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentOrderByRelationAggregateInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchOrderByRelationAggregateInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchOrderByRelationAggregateInputSchema).optional(),
  wonMatches: z.lazy(() => MatchOrderByRelationAggregateInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TeamWhereUniqueInputSchema: z.ZodType<Prisma.TeamWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => TeamWhereInputSchema),z.lazy(() => TeamWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TeamWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TeamWhereInputSchema),z.lazy(() => TeamWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  players: z.lazy(() => PlayerListRelationFilterSchema).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentListRelationFilterSchema).optional(),
  matchesTeamA: z.lazy(() => MatchListRelationFilterSchema).optional(),
  matchesTeamB: z.lazy(() => MatchListRelationFilterSchema).optional(),
  wonMatches: z.lazy(() => MatchListRelationFilterSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamListRelationFilterSchema).optional()
}).strict());

export const TeamOrderByWithAggregationInputSchema: z.ZodType<Prisma.TeamOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TeamCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TeamMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TeamMinOrderByAggregateInputSchema).optional()
}).strict();

export const TeamScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TeamScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TeamScalarWhereWithAggregatesInputSchema),z.lazy(() => TeamScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TeamScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TeamScalarWhereWithAggregatesInputSchema),z.lazy(() => TeamScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PlayerWhereInputSchema: z.ZodType<Prisma.PlayerWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PlayerWhereInputSchema),z.lazy(() => PlayerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlayerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlayerWhereInputSchema),z.lazy(() => PlayerWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  teamId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  team: z.union([ z.lazy(() => TeamNullableScalarRelationFilterSchema),z.lazy(() => TeamWhereInputSchema) ]).optional().nullable(),
}).strict();

export const PlayerOrderByWithRelationInputSchema: z.ZodType<Prisma.PlayerOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  team: z.lazy(() => TeamOrderByWithRelationInputSchema).optional()
}).strict();

export const PlayerWhereUniqueInputSchema: z.ZodType<Prisma.PlayerWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => PlayerWhereInputSchema),z.lazy(() => PlayerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlayerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlayerWhereInputSchema),z.lazy(() => PlayerWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  teamId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  team: z.union([ z.lazy(() => TeamNullableScalarRelationFilterSchema),z.lazy(() => TeamWhereInputSchema) ]).optional().nullable(),
}).strict());

export const PlayerOrderByWithAggregationInputSchema: z.ZodType<Prisma.PlayerOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PlayerCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PlayerMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PlayerMinOrderByAggregateInputSchema).optional()
}).strict();

export const PlayerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PlayerScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PlayerScalarWhereWithAggregatesInputSchema),z.lazy(() => PlayerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlayerScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlayerScalarWhereWithAggregatesInputSchema),z.lazy(() => PlayerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  teamId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const EventWhereInputSchema: z.ZodType<Prisma.EventWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  endDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tournaments: z.lazy(() => TournamentListRelationFilterSchema).optional()
}).strict();

export const EventOrderByWithRelationInputSchema: z.ZodType<Prisma.EventOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tournaments: z.lazy(() => TournamentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const EventWhereUniqueInputSchema: z.ZodType<Prisma.EventWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventWhereInputSchema),z.lazy(() => EventWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  endDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tournaments: z.lazy(() => TournamentListRelationFilterSchema).optional()
}).strict());

export const EventOrderByWithAggregationInputSchema: z.ZodType<Prisma.EventOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EventCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EventMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EventMinOrderByAggregateInputSchema).optional()
}).strict();

export const EventScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EventScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EventScalarWhereWithAggregatesInputSchema),z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EventScalarWhereWithAggregatesInputSchema),z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  endDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  location: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TournamentWhereInputSchema: z.ZodType<Prisma.TournamentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TournamentWhereInputSchema),z.lazy(() => TournamentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TournamentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TournamentWhereInputSchema),z.lazy(() => TournamentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  endDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  event: z.union([ z.lazy(() => EventScalarRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional(),
  phases: z.lazy(() => PhaseListRelationFilterSchema).optional(),
  teams: z.lazy(() => TeamTournamentListRelationFilterSchema).optional()
}).strict();

export const TournamentOrderByWithRelationInputSchema: z.ZodType<Prisma.TournamentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  event: z.lazy(() => EventOrderByWithRelationInputSchema).optional(),
  phases: z.lazy(() => PhaseOrderByRelationAggregateInputSchema).optional(),
  teams: z.lazy(() => TeamTournamentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TournamentWhereUniqueInputSchema: z.ZodType<Prisma.TournamentWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    eventId_name: z.lazy(() => TournamentEventIdNameCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    eventId_name: z.lazy(() => TournamentEventIdNameCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  eventId_name: z.lazy(() => TournamentEventIdNameCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => TournamentWhereInputSchema),z.lazy(() => TournamentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TournamentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TournamentWhereInputSchema),z.lazy(() => TournamentWhereInputSchema).array() ]).optional(),
  eventId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  endDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  event: z.union([ z.lazy(() => EventScalarRelationFilterSchema),z.lazy(() => EventWhereInputSchema) ]).optional(),
  phases: z.lazy(() => PhaseListRelationFilterSchema).optional(),
  teams: z.lazy(() => TeamTournamentListRelationFilterSchema).optional()
}).strict());

export const TournamentOrderByWithAggregationInputSchema: z.ZodType<Prisma.TournamentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  endDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TournamentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TournamentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TournamentMinOrderByAggregateInputSchema).optional()
}).strict();

export const TournamentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TournamentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TournamentScalarWhereWithAggregatesInputSchema),z.lazy(() => TournamentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TournamentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TournamentScalarWhereWithAggregatesInputSchema),z.lazy(() => TournamentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  endDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TeamTournamentWhereInputSchema: z.ZodType<Prisma.TeamTournamentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TeamTournamentWhereInputSchema),z.lazy(() => TeamTournamentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TeamTournamentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TeamTournamentWhereInputSchema),z.lazy(() => TeamTournamentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tournamentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  teamId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  seed: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tournament: z.union([ z.lazy(() => TournamentScalarRelationFilterSchema),z.lazy(() => TournamentWhereInputSchema) ]).optional(),
  team: z.union([ z.lazy(() => TeamScalarRelationFilterSchema),z.lazy(() => TeamWhereInputSchema) ]).optional(),
}).strict();

export const TeamTournamentOrderByWithRelationInputSchema: z.ZodType<Prisma.TeamTournamentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.lazy(() => SortOrderSchema).optional(),
  seed: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  tournament: z.lazy(() => TournamentOrderByWithRelationInputSchema).optional(),
  team: z.lazy(() => TeamOrderByWithRelationInputSchema).optional()
}).strict();

export const TeamTournamentWhereUniqueInputSchema: z.ZodType<Prisma.TeamTournamentWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    tournamentId_teamId: z.lazy(() => TeamTournamentTournamentIdTeamIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    tournamentId_teamId: z.lazy(() => TeamTournamentTournamentIdTeamIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  tournamentId_teamId: z.lazy(() => TeamTournamentTournamentIdTeamIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => TeamTournamentWhereInputSchema),z.lazy(() => TeamTournamentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TeamTournamentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TeamTournamentWhereInputSchema),z.lazy(() => TeamTournamentWhereInputSchema).array() ]).optional(),
  tournamentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  teamId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  seed: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  tournament: z.union([ z.lazy(() => TournamentScalarRelationFilterSchema),z.lazy(() => TournamentWhereInputSchema) ]).optional(),
  team: z.union([ z.lazy(() => TeamScalarRelationFilterSchema),z.lazy(() => TeamWhereInputSchema) ]).optional(),
}).strict());

export const TeamTournamentOrderByWithAggregationInputSchema: z.ZodType<Prisma.TeamTournamentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.lazy(() => SortOrderSchema).optional(),
  seed: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TeamTournamentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TeamTournamentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TeamTournamentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TeamTournamentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TeamTournamentSumOrderByAggregateInputSchema).optional()
}).strict();

export const TeamTournamentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TeamTournamentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TeamTournamentScalarWhereWithAggregatesInputSchema),z.lazy(() => TeamTournamentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TeamTournamentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TeamTournamentScalarWhereWithAggregatesInputSchema),z.lazy(() => TeamTournamentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tournamentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  teamId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  seed: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PhaseWhereInputSchema: z.ZodType<Prisma.PhaseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PhaseWhereInputSchema),z.lazy(() => PhaseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PhaseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PhaseWhereInputSchema),z.lazy(() => PhaseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tournamentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumPhaseTypeFilterSchema),z.lazy(() => PhaseTypeSchema) ]).optional(),
  previousPhaseId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  nextPhaseId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tournament: z.union([ z.lazy(() => TournamentScalarRelationFilterSchema),z.lazy(() => TournamentWhereInputSchema) ]).optional(),
  rounds: z.lazy(() => RoundListRelationFilterSchema).optional(),
  previousPhase: z.union([ z.lazy(() => PhaseNullableScalarRelationFilterSchema),z.lazy(() => PhaseWhereInputSchema) ]).optional().nullable(),
  nextPhaseRelation: z.union([ z.lazy(() => PhaseNullableScalarRelationFilterSchema),z.lazy(() => PhaseWhereInputSchema) ]).optional().nullable(),
  nextPhase: z.union([ z.lazy(() => PhaseNullableScalarRelationFilterSchema),z.lazy(() => PhaseWhereInputSchema) ]).optional().nullable(),
  PreviousPhaseRelation: z.union([ z.lazy(() => PhaseNullableScalarRelationFilterSchema),z.lazy(() => PhaseWhereInputSchema) ]).optional().nullable(),
}).strict();

export const PhaseOrderByWithRelationInputSchema: z.ZodType<Prisma.PhaseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  previousPhaseId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  nextPhaseId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tournament: z.lazy(() => TournamentOrderByWithRelationInputSchema).optional(),
  rounds: z.lazy(() => RoundOrderByRelationAggregateInputSchema).optional(),
  previousPhase: z.lazy(() => PhaseOrderByWithRelationInputSchema).optional(),
  nextPhaseRelation: z.lazy(() => PhaseOrderByWithRelationInputSchema).optional(),
  nextPhase: z.lazy(() => PhaseOrderByWithRelationInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseOrderByWithRelationInputSchema).optional()
}).strict();

export const PhaseWhereUniqueInputSchema: z.ZodType<Prisma.PhaseWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    previousPhaseId: z.string(),
    nextPhaseId: z.string()
  }),
  z.object({
    id: z.string().uuid(),
    previousPhaseId: z.string(),
  }),
  z.object({
    id: z.string().uuid(),
    nextPhaseId: z.string(),
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    previousPhaseId: z.string(),
    nextPhaseId: z.string(),
  }),
  z.object({
    previousPhaseId: z.string(),
  }),
  z.object({
    nextPhaseId: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  previousPhaseId: z.string().optional(),
  nextPhaseId: z.string().optional(),
  AND: z.union([ z.lazy(() => PhaseWhereInputSchema),z.lazy(() => PhaseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PhaseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PhaseWhereInputSchema),z.lazy(() => PhaseWhereInputSchema).array() ]).optional(),
  tournamentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumPhaseTypeFilterSchema),z.lazy(() => PhaseTypeSchema) ]).optional(),
  tournament: z.union([ z.lazy(() => TournamentScalarRelationFilterSchema),z.lazy(() => TournamentWhereInputSchema) ]).optional(),
  rounds: z.lazy(() => RoundListRelationFilterSchema).optional(),
  previousPhase: z.union([ z.lazy(() => PhaseNullableScalarRelationFilterSchema),z.lazy(() => PhaseWhereInputSchema) ]).optional().nullable(),
  nextPhaseRelation: z.union([ z.lazy(() => PhaseNullableScalarRelationFilterSchema),z.lazy(() => PhaseWhereInputSchema) ]).optional().nullable(),
  nextPhase: z.union([ z.lazy(() => PhaseNullableScalarRelationFilterSchema),z.lazy(() => PhaseWhereInputSchema) ]).optional().nullable(),
  PreviousPhaseRelation: z.union([ z.lazy(() => PhaseNullableScalarRelationFilterSchema),z.lazy(() => PhaseWhereInputSchema) ]).optional().nullable(),
}).strict());

export const PhaseOrderByWithAggregationInputSchema: z.ZodType<Prisma.PhaseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  previousPhaseId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  nextPhaseId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PhaseCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PhaseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PhaseMinOrderByAggregateInputSchema).optional()
}).strict();

export const PhaseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PhaseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PhaseScalarWhereWithAggregatesInputSchema),z.lazy(() => PhaseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PhaseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PhaseScalarWhereWithAggregatesInputSchema),z.lazy(() => PhaseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tournamentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumPhaseTypeWithAggregatesFilterSchema),z.lazy(() => PhaseTypeSchema) ]).optional(),
  previousPhaseId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  nextPhaseId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const RoundWhereInputSchema: z.ZodType<Prisma.RoundWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RoundWhereInputSchema),z.lazy(() => RoundWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoundWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoundWhereInputSchema),z.lazy(() => RoundWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phaseId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  roundNumber: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  phase: z.union([ z.lazy(() => PhaseScalarRelationFilterSchema),z.lazy(() => PhaseWhereInputSchema) ]).optional(),
  matches: z.lazy(() => MatchRoundListRelationFilterSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamListRelationFilterSchema).optional()
}).strict();

export const RoundOrderByWithRelationInputSchema: z.ZodType<Prisma.RoundOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phaseId: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  roundNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phase: z.lazy(() => PhaseOrderByWithRelationInputSchema).optional(),
  matches: z.lazy(() => MatchRoundOrderByRelationAggregateInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamOrderByRelationAggregateInputSchema).optional()
}).strict();

export const RoundWhereUniqueInputSchema: z.ZodType<Prisma.RoundWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => RoundWhereInputSchema),z.lazy(() => RoundWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoundWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoundWhereInputSchema),z.lazy(() => RoundWhereInputSchema).array() ]).optional(),
  phaseId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  roundNumber: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  phase: z.union([ z.lazy(() => PhaseScalarRelationFilterSchema),z.lazy(() => PhaseWhereInputSchema) ]).optional(),
  matches: z.lazy(() => MatchRoundListRelationFilterSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamListRelationFilterSchema).optional()
}).strict());

export const RoundOrderByWithAggregationInputSchema: z.ZodType<Prisma.RoundOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phaseId: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  roundNumber: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => RoundCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RoundAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RoundMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RoundMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RoundSumOrderByAggregateInputSchema).optional()
}).strict();

export const RoundScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RoundScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RoundScalarWhereWithAggregatesInputSchema),z.lazy(() => RoundScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoundScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoundScalarWhereWithAggregatesInputSchema),z.lazy(() => RoundScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phaseId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  roundNumber: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const MatchRoundWhereInputSchema: z.ZodType<Prisma.MatchRoundWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MatchRoundWhereInputSchema),z.lazy(() => MatchRoundWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MatchRoundWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MatchRoundWhereInputSchema),z.lazy(() => MatchRoundWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  numRoundMatch: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  roundId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  matchId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  round: z.union([ z.lazy(() => RoundScalarRelationFilterSchema),z.lazy(() => RoundWhereInputSchema) ]).optional(),
  match: z.union([ z.lazy(() => MatchScalarRelationFilterSchema),z.lazy(() => MatchWhereInputSchema) ]).optional(),
}).strict();

export const MatchRoundOrderByWithRelationInputSchema: z.ZodType<Prisma.MatchRoundOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  numRoundMatch: z.lazy(() => SortOrderSchema).optional(),
  roundId: z.lazy(() => SortOrderSchema).optional(),
  matchId: z.lazy(() => SortOrderSchema).optional(),
  round: z.lazy(() => RoundOrderByWithRelationInputSchema).optional(),
  match: z.lazy(() => MatchOrderByWithRelationInputSchema).optional()
}).strict();

export const MatchRoundWhereUniqueInputSchema: z.ZodType<Prisma.MatchRoundWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    matchId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    matchId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  matchId: z.string().optional(),
  AND: z.union([ z.lazy(() => MatchRoundWhereInputSchema),z.lazy(() => MatchRoundWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MatchRoundWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MatchRoundWhereInputSchema),z.lazy(() => MatchRoundWhereInputSchema).array() ]).optional(),
  numRoundMatch: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  roundId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  round: z.union([ z.lazy(() => RoundScalarRelationFilterSchema),z.lazy(() => RoundWhereInputSchema) ]).optional(),
  match: z.union([ z.lazy(() => MatchScalarRelationFilterSchema),z.lazy(() => MatchWhereInputSchema) ]).optional(),
}).strict());

export const MatchRoundOrderByWithAggregationInputSchema: z.ZodType<Prisma.MatchRoundOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  numRoundMatch: z.lazy(() => SortOrderSchema).optional(),
  roundId: z.lazy(() => SortOrderSchema).optional(),
  matchId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MatchRoundCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MatchRoundAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MatchRoundMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MatchRoundMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MatchRoundSumOrderByAggregateInputSchema).optional()
}).strict();

export const MatchRoundScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MatchRoundScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MatchRoundScalarWhereWithAggregatesInputSchema),z.lazy(() => MatchRoundScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MatchRoundScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MatchRoundScalarWhereWithAggregatesInputSchema),z.lazy(() => MatchRoundScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  numRoundMatch: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  roundId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  matchId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const RoundTeamWhereInputSchema: z.ZodType<Prisma.RoundTeamWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RoundTeamWhereInputSchema),z.lazy(() => RoundTeamWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoundTeamWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoundTeamWhereInputSchema),z.lazy(() => RoundTeamWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  teamId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  roundId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  team: z.union([ z.lazy(() => TeamScalarRelationFilterSchema),z.lazy(() => TeamWhereInputSchema) ]).optional(),
  round: z.union([ z.lazy(() => RoundScalarRelationFilterSchema),z.lazy(() => RoundWhereInputSchema) ]).optional(),
}).strict();

export const RoundTeamOrderByWithRelationInputSchema: z.ZodType<Prisma.RoundTeamOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.lazy(() => SortOrderSchema).optional(),
  roundId: z.lazy(() => SortOrderSchema).optional(),
  team: z.lazy(() => TeamOrderByWithRelationInputSchema).optional(),
  round: z.lazy(() => RoundOrderByWithRelationInputSchema).optional()
}).strict();

export const RoundTeamWhereUniqueInputSchema: z.ZodType<Prisma.RoundTeamWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    roundId_teamId: z.lazy(() => RoundTeamRoundIdTeamIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    roundId_teamId: z.lazy(() => RoundTeamRoundIdTeamIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  roundId_teamId: z.lazy(() => RoundTeamRoundIdTeamIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => RoundTeamWhereInputSchema),z.lazy(() => RoundTeamWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoundTeamWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoundTeamWhereInputSchema),z.lazy(() => RoundTeamWhereInputSchema).array() ]).optional(),
  teamId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  roundId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  team: z.union([ z.lazy(() => TeamScalarRelationFilterSchema),z.lazy(() => TeamWhereInputSchema) ]).optional(),
  round: z.union([ z.lazy(() => RoundScalarRelationFilterSchema),z.lazy(() => RoundWhereInputSchema) ]).optional(),
}).strict());

export const RoundTeamOrderByWithAggregationInputSchema: z.ZodType<Prisma.RoundTeamOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.lazy(() => SortOrderSchema).optional(),
  roundId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RoundTeamCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RoundTeamMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RoundTeamMinOrderByAggregateInputSchema).optional()
}).strict();

export const RoundTeamScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RoundTeamScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RoundTeamScalarWhereWithAggregatesInputSchema),z.lazy(() => RoundTeamScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoundTeamScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoundTeamScalarWhereWithAggregatesInputSchema),z.lazy(() => RoundTeamScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  teamId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  roundId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  userName: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  userName: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const MatchCreateInputSchema: z.ZodType<Prisma.MatchCreateInput> = z.object({
  id: z.string().cuid().optional(),
  matchNumber: z.number().int().optional().nullable(),
  scoreTeamA: z.number().int().optional().nullable(),
  scoreTeamB: z.number().int().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  location: z.string().optional().nullable(),
  status: z.lazy(() => MatchStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  teamA: z.lazy(() => TeamCreateNestedOneWithoutMatchesTeamAInputSchema).optional(),
  teamB: z.lazy(() => TeamCreateNestedOneWithoutMatchesTeamBInputSchema).optional(),
  winner: z.lazy(() => TeamCreateNestedOneWithoutWonMatchesInputSchema).optional(),
  round: z.lazy(() => MatchRoundCreateNestedOneWithoutMatchInputSchema).optional()
}).strict();

export const MatchUncheckedCreateInputSchema: z.ZodType<Prisma.MatchUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  matchNumber: z.number().int().optional().nullable(),
  teamAId: z.string().optional().nullable(),
  teamBId: z.string().optional().nullable(),
  scoreTeamA: z.number().int().optional().nullable(),
  scoreTeamB: z.number().int().optional().nullable(),
  winnerId: z.string().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  location: z.string().optional().nullable(),
  status: z.lazy(() => MatchStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  round: z.lazy(() => MatchRoundUncheckedCreateNestedOneWithoutMatchInputSchema).optional()
}).strict();

export const MatchUpdateInputSchema: z.ZodType<Prisma.MatchUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  matchNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamA: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamB: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MatchStatusSchema),z.lazy(() => EnumMatchStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  teamA: z.lazy(() => TeamUpdateOneWithoutMatchesTeamANestedInputSchema).optional(),
  teamB: z.lazy(() => TeamUpdateOneWithoutMatchesTeamBNestedInputSchema).optional(),
  winner: z.lazy(() => TeamUpdateOneWithoutWonMatchesNestedInputSchema).optional(),
  round: z.lazy(() => MatchRoundUpdateOneWithoutMatchNestedInputSchema).optional()
}).strict();

export const MatchUncheckedUpdateInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  matchNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  teamAId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  teamBId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamA: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamB: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  winnerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MatchStatusSchema),z.lazy(() => EnumMatchStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  round: z.lazy(() => MatchRoundUncheckedUpdateOneWithoutMatchNestedInputSchema).optional()
}).strict();

export const MatchCreateManyInputSchema: z.ZodType<Prisma.MatchCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  matchNumber: z.number().int().optional().nullable(),
  teamAId: z.string().optional().nullable(),
  teamBId: z.string().optional().nullable(),
  scoreTeamA: z.number().int().optional().nullable(),
  scoreTeamB: z.number().int().optional().nullable(),
  winnerId: z.string().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  location: z.string().optional().nullable(),
  status: z.lazy(() => MatchStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const MatchUpdateManyMutationInputSchema: z.ZodType<Prisma.MatchUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  matchNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamA: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamB: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MatchStatusSchema),z.lazy(() => EnumMatchStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MatchUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  matchNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  teamAId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  teamBId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamA: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamB: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  winnerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MatchStatusSchema),z.lazy(() => EnumMatchStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TeamCreateInputSchema: z.ZodType<Prisma.TeamCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  players: z.lazy(() => PlayerCreateNestedManyWithoutTeamInputSchema).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentCreateNestedManyWithoutTeamInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchCreateNestedManyWithoutTeamAInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchCreateNestedManyWithoutTeamBInputSchema).optional(),
  wonMatches: z.lazy(() => MatchCreateNestedManyWithoutWinnerInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamCreateNestedManyWithoutTeamInputSchema).optional()
}).strict();

export const TeamUncheckedCreateInputSchema: z.ZodType<Prisma.TeamUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  players: z.lazy(() => PlayerUncheckedCreateNestedManyWithoutTeamInputSchema).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentUncheckedCreateNestedManyWithoutTeamInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeamAInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeamBInputSchema).optional(),
  wonMatches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutWinnerInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUncheckedCreateNestedManyWithoutTeamInputSchema).optional()
}).strict();

export const TeamUpdateInputSchema: z.ZodType<Prisma.TeamUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => PlayerUpdateManyWithoutTeamNestedInputSchema).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentUpdateManyWithoutTeamNestedInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchUpdateManyWithoutTeamANestedInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchUpdateManyWithoutTeamBNestedInputSchema).optional(),
  wonMatches: z.lazy(() => MatchUpdateManyWithoutWinnerNestedInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUpdateManyWithoutTeamNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => PlayerUncheckedUpdateManyWithoutTeamNestedInputSchema).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentUncheckedUpdateManyWithoutTeamNestedInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchUncheckedUpdateManyWithoutTeamANestedInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchUncheckedUpdateManyWithoutTeamBNestedInputSchema).optional(),
  wonMatches: z.lazy(() => MatchUncheckedUpdateManyWithoutWinnerNestedInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUncheckedUpdateManyWithoutTeamNestedInputSchema).optional()
}).strict();

export const TeamCreateManyInputSchema: z.ZodType<Prisma.TeamCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TeamUpdateManyMutationInputSchema: z.ZodType<Prisma.TeamUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TeamUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlayerCreateInputSchema: z.ZodType<Prisma.PlayerCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  team: z.lazy(() => TeamCreateNestedOneWithoutPlayersInputSchema).optional()
}).strict();

export const PlayerUncheckedCreateInputSchema: z.ZodType<Prisma.PlayerUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  teamId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PlayerUpdateInputSchema: z.ZodType<Prisma.PlayerUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  team: z.lazy(() => TeamUpdateOneWithoutPlayersNestedInputSchema).optional()
}).strict();

export const PlayerUncheckedUpdateInputSchema: z.ZodType<Prisma.PlayerUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teamId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlayerCreateManyInputSchema: z.ZodType<Prisma.PlayerCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  teamId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PlayerUpdateManyMutationInputSchema: z.ZodType<Prisma.PlayerUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlayerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PlayerUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teamId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventCreateInputSchema: z.ZodType<Prisma.EventCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournaments: z.lazy(() => TournamentCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventUncheckedCreateInputSchema: z.ZodType<Prisma.EventUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournaments: z.lazy(() => TournamentUncheckedCreateNestedManyWithoutEventInputSchema).optional()
}).strict();

export const EventUpdateInputSchema: z.ZodType<Prisma.EventUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournaments: z.lazy(() => TournamentUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventUncheckedUpdateInputSchema: z.ZodType<Prisma.EventUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournaments: z.lazy(() => TournamentUncheckedUpdateManyWithoutEventNestedInputSchema).optional()
}).strict();

export const EventCreateManyInputSchema: z.ZodType<Prisma.EventCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const EventUpdateManyMutationInputSchema: z.ZodType<Prisma.EventUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TournamentCreateInputSchema: z.ZodType<Prisma.TournamentCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  event: z.lazy(() => EventCreateNestedOneWithoutTournamentsInputSchema),
  phases: z.lazy(() => PhaseCreateNestedManyWithoutTournamentInputSchema).optional(),
  teams: z.lazy(() => TeamTournamentCreateNestedManyWithoutTournamentInputSchema).optional()
}).strict();

export const TournamentUncheckedCreateInputSchema: z.ZodType<Prisma.TournamentUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  eventId: z.string(),
  name: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  phases: z.lazy(() => PhaseUncheckedCreateNestedManyWithoutTournamentInputSchema).optional(),
  teams: z.lazy(() => TeamTournamentUncheckedCreateNestedManyWithoutTournamentInputSchema).optional()
}).strict();

export const TournamentUpdateInputSchema: z.ZodType<Prisma.TournamentUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  event: z.lazy(() => EventUpdateOneRequiredWithoutTournamentsNestedInputSchema).optional(),
  phases: z.lazy(() => PhaseUpdateManyWithoutTournamentNestedInputSchema).optional(),
  teams: z.lazy(() => TeamTournamentUpdateManyWithoutTournamentNestedInputSchema).optional()
}).strict();

export const TournamentUncheckedUpdateInputSchema: z.ZodType<Prisma.TournamentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  phases: z.lazy(() => PhaseUncheckedUpdateManyWithoutTournamentNestedInputSchema).optional(),
  teams: z.lazy(() => TeamTournamentUncheckedUpdateManyWithoutTournamentNestedInputSchema).optional()
}).strict();

export const TournamentCreateManyInputSchema: z.ZodType<Prisma.TournamentCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  eventId: z.string(),
  name: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TournamentUpdateManyMutationInputSchema: z.ZodType<Prisma.TournamentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TournamentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TournamentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TeamTournamentCreateInputSchema: z.ZodType<Prisma.TeamTournamentCreateInput> = z.object({
  id: z.string().cuid().optional(),
  seed: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournament: z.lazy(() => TournamentCreateNestedOneWithoutTeamsInputSchema),
  team: z.lazy(() => TeamCreateNestedOneWithoutTeamInTournamentsInputSchema)
}).strict();

export const TeamTournamentUncheckedCreateInputSchema: z.ZodType<Prisma.TeamTournamentUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  tournamentId: z.string(),
  teamId: z.string(),
  seed: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TeamTournamentUpdateInputSchema: z.ZodType<Prisma.TeamTournamentUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seed: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournament: z.lazy(() => TournamentUpdateOneRequiredWithoutTeamsNestedInputSchema).optional(),
  team: z.lazy(() => TeamUpdateOneRequiredWithoutTeamInTournamentsNestedInputSchema).optional()
}).strict();

export const TeamTournamentUncheckedUpdateInputSchema: z.ZodType<Prisma.TeamTournamentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teamId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seed: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TeamTournamentCreateManyInputSchema: z.ZodType<Prisma.TeamTournamentCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  tournamentId: z.string(),
  teamId: z.string(),
  seed: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TeamTournamentUpdateManyMutationInputSchema: z.ZodType<Prisma.TeamTournamentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seed: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TeamTournamentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TeamTournamentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teamId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seed: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PhaseCreateInputSchema: z.ZodType<Prisma.PhaseCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  type: z.lazy(() => PhaseTypeSchema).optional(),
  tournament: z.lazy(() => TournamentCreateNestedOneWithoutPhasesInputSchema),
  rounds: z.lazy(() => RoundCreateNestedManyWithoutPhaseInputSchema).optional(),
  previousPhase: z.lazy(() => PhaseCreateNestedOneWithoutNextPhaseRelationInputSchema).optional(),
  nextPhaseRelation: z.lazy(() => PhaseCreateNestedOneWithoutPreviousPhaseInputSchema).optional(),
  nextPhase: z.lazy(() => PhaseCreateNestedOneWithoutPreviousPhaseRelationInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseCreateNestedOneWithoutNextPhaseInputSchema).optional()
}).strict();

export const PhaseUncheckedCreateInputSchema: z.ZodType<Prisma.PhaseUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  tournamentId: z.string(),
  name: z.string(),
  type: z.lazy(() => PhaseTypeSchema).optional(),
  previousPhaseId: z.string().optional().nullable(),
  nextPhaseId: z.string().optional().nullable(),
  rounds: z.lazy(() => RoundUncheckedCreateNestedManyWithoutPhaseInputSchema).optional(),
  nextPhaseRelation: z.lazy(() => PhaseUncheckedCreateNestedOneWithoutPreviousPhaseInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseUncheckedCreateNestedOneWithoutNextPhaseInputSchema).optional()
}).strict();

export const PhaseUpdateInputSchema: z.ZodType<Prisma.PhaseUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PhaseTypeSchema),z.lazy(() => EnumPhaseTypeFieldUpdateOperationsInputSchema) ]).optional(),
  tournament: z.lazy(() => TournamentUpdateOneRequiredWithoutPhasesNestedInputSchema).optional(),
  rounds: z.lazy(() => RoundUpdateManyWithoutPhaseNestedInputSchema).optional(),
  previousPhase: z.lazy(() => PhaseUpdateOneWithoutNextPhaseRelationNestedInputSchema).optional(),
  nextPhaseRelation: z.lazy(() => PhaseUpdateOneWithoutPreviousPhaseNestedInputSchema).optional(),
  nextPhase: z.lazy(() => PhaseUpdateOneWithoutPreviousPhaseRelationNestedInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseUpdateOneWithoutNextPhaseNestedInputSchema).optional()
}).strict();

export const PhaseUncheckedUpdateInputSchema: z.ZodType<Prisma.PhaseUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PhaseTypeSchema),z.lazy(() => EnumPhaseTypeFieldUpdateOperationsInputSchema) ]).optional(),
  previousPhaseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextPhaseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rounds: z.lazy(() => RoundUncheckedUpdateManyWithoutPhaseNestedInputSchema).optional(),
  nextPhaseRelation: z.lazy(() => PhaseUncheckedUpdateOneWithoutPreviousPhaseNestedInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseUncheckedUpdateOneWithoutNextPhaseNestedInputSchema).optional()
}).strict();

export const PhaseCreateManyInputSchema: z.ZodType<Prisma.PhaseCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  tournamentId: z.string(),
  name: z.string(),
  type: z.lazy(() => PhaseTypeSchema).optional(),
  previousPhaseId: z.string().optional().nullable(),
  nextPhaseId: z.string().optional().nullable()
}).strict();

export const PhaseUpdateManyMutationInputSchema: z.ZodType<Prisma.PhaseUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PhaseTypeSchema),z.lazy(() => EnumPhaseTypeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PhaseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PhaseUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PhaseTypeSchema),z.lazy(() => EnumPhaseTypeFieldUpdateOperationsInputSchema) ]).optional(),
  previousPhaseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextPhaseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RoundCreateInputSchema: z.ZodType<Prisma.RoundCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional().nullable(),
  roundNumber: z.number().int().optional().nullable(),
  phase: z.lazy(() => PhaseCreateNestedOneWithoutRoundsInputSchema),
  matches: z.lazy(() => MatchRoundCreateNestedManyWithoutRoundInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamCreateNestedManyWithoutRoundInputSchema).optional()
}).strict();

export const RoundUncheckedCreateInputSchema: z.ZodType<Prisma.RoundUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  phaseId: z.string(),
  name: z.string().optional().nullable(),
  roundNumber: z.number().int().optional().nullable(),
  matches: z.lazy(() => MatchRoundUncheckedCreateNestedManyWithoutRoundInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUncheckedCreateNestedManyWithoutRoundInputSchema).optional()
}).strict();

export const RoundUpdateInputSchema: z.ZodType<Prisma.RoundUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roundNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phase: z.lazy(() => PhaseUpdateOneRequiredWithoutRoundsNestedInputSchema).optional(),
  matches: z.lazy(() => MatchRoundUpdateManyWithoutRoundNestedInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUpdateManyWithoutRoundNestedInputSchema).optional()
}).strict();

export const RoundUncheckedUpdateInputSchema: z.ZodType<Prisma.RoundUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phaseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roundNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  matches: z.lazy(() => MatchRoundUncheckedUpdateManyWithoutRoundNestedInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUncheckedUpdateManyWithoutRoundNestedInputSchema).optional()
}).strict();

export const RoundCreateManyInputSchema: z.ZodType<Prisma.RoundCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  phaseId: z.string(),
  name: z.string().optional().nullable(),
  roundNumber: z.number().int().optional().nullable()
}).strict();

export const RoundUpdateManyMutationInputSchema: z.ZodType<Prisma.RoundUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roundNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RoundUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RoundUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phaseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roundNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MatchRoundCreateInputSchema: z.ZodType<Prisma.MatchRoundCreateInput> = z.object({
  id: z.string().cuid().optional(),
  numRoundMatch: z.number().int(),
  round: z.lazy(() => RoundCreateNestedOneWithoutMatchesInputSchema),
  match: z.lazy(() => MatchCreateNestedOneWithoutRoundInputSchema)
}).strict();

export const MatchRoundUncheckedCreateInputSchema: z.ZodType<Prisma.MatchRoundUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  numRoundMatch: z.number().int(),
  roundId: z.string(),
  matchId: z.string()
}).strict();

export const MatchRoundUpdateInputSchema: z.ZodType<Prisma.MatchRoundUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  numRoundMatch: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  round: z.lazy(() => RoundUpdateOneRequiredWithoutMatchesNestedInputSchema).optional(),
  match: z.lazy(() => MatchUpdateOneRequiredWithoutRoundNestedInputSchema).optional()
}).strict();

export const MatchRoundUncheckedUpdateInputSchema: z.ZodType<Prisma.MatchRoundUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  numRoundMatch: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roundId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  matchId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MatchRoundCreateManyInputSchema: z.ZodType<Prisma.MatchRoundCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  numRoundMatch: z.number().int(),
  roundId: z.string(),
  matchId: z.string()
}).strict();

export const MatchRoundUpdateManyMutationInputSchema: z.ZodType<Prisma.MatchRoundUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  numRoundMatch: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MatchRoundUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MatchRoundUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  numRoundMatch: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roundId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  matchId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoundTeamCreateInputSchema: z.ZodType<Prisma.RoundTeamCreateInput> = z.object({
  id: z.string().cuid().optional(),
  team: z.lazy(() => TeamCreateNestedOneWithoutRoundTeamInputSchema),
  round: z.lazy(() => RoundCreateNestedOneWithoutRoundTeamInputSchema)
}).strict();

export const RoundTeamUncheckedCreateInputSchema: z.ZodType<Prisma.RoundTeamUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  teamId: z.string(),
  roundId: z.string()
}).strict();

export const RoundTeamUpdateInputSchema: z.ZodType<Prisma.RoundTeamUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  team: z.lazy(() => TeamUpdateOneRequiredWithoutRoundTeamNestedInputSchema).optional(),
  round: z.lazy(() => RoundUpdateOneRequiredWithoutRoundTeamNestedInputSchema).optional()
}).strict();

export const RoundTeamUncheckedUpdateInputSchema: z.ZodType<Prisma.RoundTeamUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teamId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  roundId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoundTeamCreateManyInputSchema: z.ZodType<Prisma.RoundTeamCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  teamId: z.string(),
  roundId: z.string()
}).strict();

export const RoundTeamUpdateManyMutationInputSchema: z.ZodType<Prisma.RoundTeamUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoundTeamUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RoundTeamUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teamId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  roundId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  firstName: z.string(),
  lastName: z.string(),
  userName: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  firstName: z.string(),
  lastName: z.string(),
  userName: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  firstName: z.string(),
  lastName: z.string(),
  userName: z.string(),
  password: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumMatchStatusFilterSchema: z.ZodType<Prisma.EnumMatchStatusFilter> = z.object({
  equals: z.lazy(() => MatchStatusSchema).optional(),
  in: z.lazy(() => MatchStatusSchema).array().optional(),
  notIn: z.lazy(() => MatchStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => MatchStatusSchema),z.lazy(() => NestedEnumMatchStatusFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const TeamNullableScalarRelationFilterSchema: z.ZodType<Prisma.TeamNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => TeamWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => TeamWhereInputSchema).optional().nullable()
}).strict();

export const MatchRoundNullableScalarRelationFilterSchema: z.ZodType<Prisma.MatchRoundNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => MatchRoundWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => MatchRoundWhereInputSchema).optional().nullable()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const MatchCountOrderByAggregateInputSchema: z.ZodType<Prisma.MatchCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  matchNumber: z.lazy(() => SortOrderSchema).optional(),
  teamAId: z.lazy(() => SortOrderSchema).optional(),
  teamBId: z.lazy(() => SortOrderSchema).optional(),
  scoreTeamA: z.lazy(() => SortOrderSchema).optional(),
  scoreTeamB: z.lazy(() => SortOrderSchema).optional(),
  winnerId: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MatchAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MatchAvgOrderByAggregateInput> = z.object({
  matchNumber: z.lazy(() => SortOrderSchema).optional(),
  scoreTeamA: z.lazy(() => SortOrderSchema).optional(),
  scoreTeamB: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MatchMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MatchMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  matchNumber: z.lazy(() => SortOrderSchema).optional(),
  teamAId: z.lazy(() => SortOrderSchema).optional(),
  teamBId: z.lazy(() => SortOrderSchema).optional(),
  scoreTeamA: z.lazy(() => SortOrderSchema).optional(),
  scoreTeamB: z.lazy(() => SortOrderSchema).optional(),
  winnerId: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MatchMinOrderByAggregateInputSchema: z.ZodType<Prisma.MatchMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  matchNumber: z.lazy(() => SortOrderSchema).optional(),
  teamAId: z.lazy(() => SortOrderSchema).optional(),
  teamBId: z.lazy(() => SortOrderSchema).optional(),
  scoreTeamA: z.lazy(() => SortOrderSchema).optional(),
  scoreTeamB: z.lazy(() => SortOrderSchema).optional(),
  winnerId: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MatchSumOrderByAggregateInputSchema: z.ZodType<Prisma.MatchSumOrderByAggregateInput> = z.object({
  matchNumber: z.lazy(() => SortOrderSchema).optional(),
  scoreTeamA: z.lazy(() => SortOrderSchema).optional(),
  scoreTeamB: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const EnumMatchStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumMatchStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MatchStatusSchema).optional(),
  in: z.lazy(() => MatchStatusSchema).array().optional(),
  notIn: z.lazy(() => MatchStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => MatchStatusSchema),z.lazy(() => NestedEnumMatchStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMatchStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMatchStatusFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const PlayerListRelationFilterSchema: z.ZodType<Prisma.PlayerListRelationFilter> = z.object({
  every: z.lazy(() => PlayerWhereInputSchema).optional(),
  some: z.lazy(() => PlayerWhereInputSchema).optional(),
  none: z.lazy(() => PlayerWhereInputSchema).optional()
}).strict();

export const TeamTournamentListRelationFilterSchema: z.ZodType<Prisma.TeamTournamentListRelationFilter> = z.object({
  every: z.lazy(() => TeamTournamentWhereInputSchema).optional(),
  some: z.lazy(() => TeamTournamentWhereInputSchema).optional(),
  none: z.lazy(() => TeamTournamentWhereInputSchema).optional()
}).strict();

export const MatchListRelationFilterSchema: z.ZodType<Prisma.MatchListRelationFilter> = z.object({
  every: z.lazy(() => MatchWhereInputSchema).optional(),
  some: z.lazy(() => MatchWhereInputSchema).optional(),
  none: z.lazy(() => MatchWhereInputSchema).optional()
}).strict();

export const RoundTeamListRelationFilterSchema: z.ZodType<Prisma.RoundTeamListRelationFilter> = z.object({
  every: z.lazy(() => RoundTeamWhereInputSchema).optional(),
  some: z.lazy(() => RoundTeamWhereInputSchema).optional(),
  none: z.lazy(() => RoundTeamWhereInputSchema).optional()
}).strict();

export const PlayerOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PlayerOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TeamTournamentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TeamTournamentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MatchOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MatchOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoundTeamOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RoundTeamOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TeamCountOrderByAggregateInputSchema: z.ZodType<Prisma.TeamCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TeamMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TeamMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TeamMinOrderByAggregateInputSchema: z.ZodType<Prisma.TeamMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlayerCountOrderByAggregateInputSchema: z.ZodType<Prisma.PlayerCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlayerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PlayerMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlayerMinOrderByAggregateInputSchema: z.ZodType<Prisma.PlayerMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TournamentListRelationFilterSchema: z.ZodType<Prisma.TournamentListRelationFilter> = z.object({
  every: z.lazy(() => TournamentWhereInputSchema).optional(),
  some: z.lazy(() => TournamentWhereInputSchema).optional(),
  none: z.lazy(() => TournamentWhereInputSchema).optional()
}).strict();

export const TournamentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TournamentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventCountOrderByAggregateInputSchema: z.ZodType<Prisma.EventCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EventMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventMinOrderByAggregateInputSchema: z.ZodType<Prisma.EventMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EventScalarRelationFilterSchema: z.ZodType<Prisma.EventScalarRelationFilter> = z.object({
  is: z.lazy(() => EventWhereInputSchema).optional(),
  isNot: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const PhaseListRelationFilterSchema: z.ZodType<Prisma.PhaseListRelationFilter> = z.object({
  every: z.lazy(() => PhaseWhereInputSchema).optional(),
  some: z.lazy(() => PhaseWhereInputSchema).optional(),
  none: z.lazy(() => PhaseWhereInputSchema).optional()
}).strict();

export const PhaseOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PhaseOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TournamentEventIdNameCompoundUniqueInputSchema: z.ZodType<Prisma.TournamentEventIdNameCompoundUniqueInput> = z.object({
  eventId: z.string(),
  name: z.string()
}).strict();

export const TournamentCountOrderByAggregateInputSchema: z.ZodType<Prisma.TournamentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TournamentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TournamentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TournamentMinOrderByAggregateInputSchema: z.ZodType<Prisma.TournamentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  eventId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TournamentScalarRelationFilterSchema: z.ZodType<Prisma.TournamentScalarRelationFilter> = z.object({
  is: z.lazy(() => TournamentWhereInputSchema).optional(),
  isNot: z.lazy(() => TournamentWhereInputSchema).optional()
}).strict();

export const TeamScalarRelationFilterSchema: z.ZodType<Prisma.TeamScalarRelationFilter> = z.object({
  is: z.lazy(() => TeamWhereInputSchema).optional(),
  isNot: z.lazy(() => TeamWhereInputSchema).optional()
}).strict();

export const TeamTournamentTournamentIdTeamIdCompoundUniqueInputSchema: z.ZodType<Prisma.TeamTournamentTournamentIdTeamIdCompoundUniqueInput> = z.object({
  tournamentId: z.string(),
  teamId: z.string()
}).strict();

export const TeamTournamentCountOrderByAggregateInputSchema: z.ZodType<Prisma.TeamTournamentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.lazy(() => SortOrderSchema).optional(),
  seed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TeamTournamentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TeamTournamentAvgOrderByAggregateInput> = z.object({
  seed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TeamTournamentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TeamTournamentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.lazy(() => SortOrderSchema).optional(),
  seed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TeamTournamentMinOrderByAggregateInputSchema: z.ZodType<Prisma.TeamTournamentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.lazy(() => SortOrderSchema).optional(),
  seed: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TeamTournamentSumOrderByAggregateInputSchema: z.ZodType<Prisma.TeamTournamentSumOrderByAggregateInput> = z.object({
  seed: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumPhaseTypeFilterSchema: z.ZodType<Prisma.EnumPhaseTypeFilter> = z.object({
  equals: z.lazy(() => PhaseTypeSchema).optional(),
  in: z.lazy(() => PhaseTypeSchema).array().optional(),
  notIn: z.lazy(() => PhaseTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PhaseTypeSchema),z.lazy(() => NestedEnumPhaseTypeFilterSchema) ]).optional(),
}).strict();

export const RoundListRelationFilterSchema: z.ZodType<Prisma.RoundListRelationFilter> = z.object({
  every: z.lazy(() => RoundWhereInputSchema).optional(),
  some: z.lazy(() => RoundWhereInputSchema).optional(),
  none: z.lazy(() => RoundWhereInputSchema).optional()
}).strict();

export const PhaseNullableScalarRelationFilterSchema: z.ZodType<Prisma.PhaseNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => PhaseWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PhaseWhereInputSchema).optional().nullable()
}).strict();

export const RoundOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RoundOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PhaseCountOrderByAggregateInputSchema: z.ZodType<Prisma.PhaseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  previousPhaseId: z.lazy(() => SortOrderSchema).optional(),
  nextPhaseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PhaseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PhaseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  previousPhaseId: z.lazy(() => SortOrderSchema).optional(),
  nextPhaseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PhaseMinOrderByAggregateInputSchema: z.ZodType<Prisma.PhaseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  tournamentId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  previousPhaseId: z.lazy(() => SortOrderSchema).optional(),
  nextPhaseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumPhaseTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPhaseTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PhaseTypeSchema).optional(),
  in: z.lazy(() => PhaseTypeSchema).array().optional(),
  notIn: z.lazy(() => PhaseTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PhaseTypeSchema),z.lazy(() => NestedEnumPhaseTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPhaseTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPhaseTypeFilterSchema).optional()
}).strict();

export const PhaseScalarRelationFilterSchema: z.ZodType<Prisma.PhaseScalarRelationFilter> = z.object({
  is: z.lazy(() => PhaseWhereInputSchema).optional(),
  isNot: z.lazy(() => PhaseWhereInputSchema).optional()
}).strict();

export const MatchRoundListRelationFilterSchema: z.ZodType<Prisma.MatchRoundListRelationFilter> = z.object({
  every: z.lazy(() => MatchRoundWhereInputSchema).optional(),
  some: z.lazy(() => MatchRoundWhereInputSchema).optional(),
  none: z.lazy(() => MatchRoundWhereInputSchema).optional()
}).strict();

export const MatchRoundOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MatchRoundOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoundCountOrderByAggregateInputSchema: z.ZodType<Prisma.RoundCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phaseId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  roundNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoundAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RoundAvgOrderByAggregateInput> = z.object({
  roundNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoundMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RoundMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phaseId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  roundNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoundMinOrderByAggregateInputSchema: z.ZodType<Prisma.RoundMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  phaseId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  roundNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoundSumOrderByAggregateInputSchema: z.ZodType<Prisma.RoundSumOrderByAggregateInput> = z.object({
  roundNumber: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const RoundScalarRelationFilterSchema: z.ZodType<Prisma.RoundScalarRelationFilter> = z.object({
  is: z.lazy(() => RoundWhereInputSchema).optional(),
  isNot: z.lazy(() => RoundWhereInputSchema).optional()
}).strict();

export const MatchScalarRelationFilterSchema: z.ZodType<Prisma.MatchScalarRelationFilter> = z.object({
  is: z.lazy(() => MatchWhereInputSchema).optional(),
  isNot: z.lazy(() => MatchWhereInputSchema).optional()
}).strict();

export const MatchRoundCountOrderByAggregateInputSchema: z.ZodType<Prisma.MatchRoundCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  numRoundMatch: z.lazy(() => SortOrderSchema).optional(),
  roundId: z.lazy(() => SortOrderSchema).optional(),
  matchId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MatchRoundAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MatchRoundAvgOrderByAggregateInput> = z.object({
  numRoundMatch: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MatchRoundMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MatchRoundMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  numRoundMatch: z.lazy(() => SortOrderSchema).optional(),
  roundId: z.lazy(() => SortOrderSchema).optional(),
  matchId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MatchRoundMinOrderByAggregateInputSchema: z.ZodType<Prisma.MatchRoundMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  numRoundMatch: z.lazy(() => SortOrderSchema).optional(),
  roundId: z.lazy(() => SortOrderSchema).optional(),
  matchId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MatchRoundSumOrderByAggregateInputSchema: z.ZodType<Prisma.MatchRoundSumOrderByAggregateInput> = z.object({
  numRoundMatch: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const RoundTeamRoundIdTeamIdCompoundUniqueInputSchema: z.ZodType<Prisma.RoundTeamRoundIdTeamIdCompoundUniqueInput> = z.object({
  roundId: z.string(),
  teamId: z.string()
}).strict();

export const RoundTeamCountOrderByAggregateInputSchema: z.ZodType<Prisma.RoundTeamCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.lazy(() => SortOrderSchema).optional(),
  roundId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoundTeamMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RoundTeamMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.lazy(() => SortOrderSchema).optional(),
  roundId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoundTeamMinOrderByAggregateInputSchema: z.ZodType<Prisma.RoundTeamMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  teamId: z.lazy(() => SortOrderSchema).optional(),
  roundId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  userName: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  userName: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  userName: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TeamCreateNestedOneWithoutMatchesTeamAInputSchema: z.ZodType<Prisma.TeamCreateNestedOneWithoutMatchesTeamAInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutMatchesTeamAInputSchema),z.lazy(() => TeamUncheckedCreateWithoutMatchesTeamAInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutMatchesTeamAInputSchema).optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional()
}).strict();

export const TeamCreateNestedOneWithoutMatchesTeamBInputSchema: z.ZodType<Prisma.TeamCreateNestedOneWithoutMatchesTeamBInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutMatchesTeamBInputSchema),z.lazy(() => TeamUncheckedCreateWithoutMatchesTeamBInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutMatchesTeamBInputSchema).optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional()
}).strict();

export const TeamCreateNestedOneWithoutWonMatchesInputSchema: z.ZodType<Prisma.TeamCreateNestedOneWithoutWonMatchesInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutWonMatchesInputSchema),z.lazy(() => TeamUncheckedCreateWithoutWonMatchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutWonMatchesInputSchema).optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional()
}).strict();

export const MatchRoundCreateNestedOneWithoutMatchInputSchema: z.ZodType<Prisma.MatchRoundCreateNestedOneWithoutMatchInput> = z.object({
  create: z.union([ z.lazy(() => MatchRoundCreateWithoutMatchInputSchema),z.lazy(() => MatchRoundUncheckedCreateWithoutMatchInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MatchRoundCreateOrConnectWithoutMatchInputSchema).optional(),
  connect: z.lazy(() => MatchRoundWhereUniqueInputSchema).optional()
}).strict();

export const MatchRoundUncheckedCreateNestedOneWithoutMatchInputSchema: z.ZodType<Prisma.MatchRoundUncheckedCreateNestedOneWithoutMatchInput> = z.object({
  create: z.union([ z.lazy(() => MatchRoundCreateWithoutMatchInputSchema),z.lazy(() => MatchRoundUncheckedCreateWithoutMatchInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MatchRoundCreateOrConnectWithoutMatchInputSchema).optional(),
  connect: z.lazy(() => MatchRoundWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const EnumMatchStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumMatchStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => MatchStatusSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const TeamUpdateOneWithoutMatchesTeamANestedInputSchema: z.ZodType<Prisma.TeamUpdateOneWithoutMatchesTeamANestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutMatchesTeamAInputSchema),z.lazy(() => TeamUncheckedCreateWithoutMatchesTeamAInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutMatchesTeamAInputSchema).optional(),
  upsert: z.lazy(() => TeamUpsertWithoutMatchesTeamAInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => TeamWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => TeamWhereInputSchema) ]).optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TeamUpdateToOneWithWhereWithoutMatchesTeamAInputSchema),z.lazy(() => TeamUpdateWithoutMatchesTeamAInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutMatchesTeamAInputSchema) ]).optional(),
}).strict();

export const TeamUpdateOneWithoutMatchesTeamBNestedInputSchema: z.ZodType<Prisma.TeamUpdateOneWithoutMatchesTeamBNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutMatchesTeamBInputSchema),z.lazy(() => TeamUncheckedCreateWithoutMatchesTeamBInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutMatchesTeamBInputSchema).optional(),
  upsert: z.lazy(() => TeamUpsertWithoutMatchesTeamBInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => TeamWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => TeamWhereInputSchema) ]).optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TeamUpdateToOneWithWhereWithoutMatchesTeamBInputSchema),z.lazy(() => TeamUpdateWithoutMatchesTeamBInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutMatchesTeamBInputSchema) ]).optional(),
}).strict();

export const TeamUpdateOneWithoutWonMatchesNestedInputSchema: z.ZodType<Prisma.TeamUpdateOneWithoutWonMatchesNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutWonMatchesInputSchema),z.lazy(() => TeamUncheckedCreateWithoutWonMatchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutWonMatchesInputSchema).optional(),
  upsert: z.lazy(() => TeamUpsertWithoutWonMatchesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => TeamWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => TeamWhereInputSchema) ]).optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TeamUpdateToOneWithWhereWithoutWonMatchesInputSchema),z.lazy(() => TeamUpdateWithoutWonMatchesInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutWonMatchesInputSchema) ]).optional(),
}).strict();

export const MatchRoundUpdateOneWithoutMatchNestedInputSchema: z.ZodType<Prisma.MatchRoundUpdateOneWithoutMatchNestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchRoundCreateWithoutMatchInputSchema),z.lazy(() => MatchRoundUncheckedCreateWithoutMatchInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MatchRoundCreateOrConnectWithoutMatchInputSchema).optional(),
  upsert: z.lazy(() => MatchRoundUpsertWithoutMatchInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => MatchRoundWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => MatchRoundWhereInputSchema) ]).optional(),
  connect: z.lazy(() => MatchRoundWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MatchRoundUpdateToOneWithWhereWithoutMatchInputSchema),z.lazy(() => MatchRoundUpdateWithoutMatchInputSchema),z.lazy(() => MatchRoundUncheckedUpdateWithoutMatchInputSchema) ]).optional(),
}).strict();

export const MatchRoundUncheckedUpdateOneWithoutMatchNestedInputSchema: z.ZodType<Prisma.MatchRoundUncheckedUpdateOneWithoutMatchNestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchRoundCreateWithoutMatchInputSchema),z.lazy(() => MatchRoundUncheckedCreateWithoutMatchInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MatchRoundCreateOrConnectWithoutMatchInputSchema).optional(),
  upsert: z.lazy(() => MatchRoundUpsertWithoutMatchInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => MatchRoundWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => MatchRoundWhereInputSchema) ]).optional(),
  connect: z.lazy(() => MatchRoundWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MatchRoundUpdateToOneWithWhereWithoutMatchInputSchema),z.lazy(() => MatchRoundUpdateWithoutMatchInputSchema),z.lazy(() => MatchRoundUncheckedUpdateWithoutMatchInputSchema) ]).optional(),
}).strict();

export const PlayerCreateNestedManyWithoutTeamInputSchema: z.ZodType<Prisma.PlayerCreateNestedManyWithoutTeamInput> = z.object({
  create: z.union([ z.lazy(() => PlayerCreateWithoutTeamInputSchema),z.lazy(() => PlayerCreateWithoutTeamInputSchema).array(),z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema),z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema),z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PlayerCreateManyTeamInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PlayerWhereUniqueInputSchema),z.lazy(() => PlayerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TeamTournamentCreateNestedManyWithoutTeamInputSchema: z.ZodType<Prisma.TeamTournamentCreateNestedManyWithoutTeamInput> = z.object({
  create: z.union([ z.lazy(() => TeamTournamentCreateWithoutTeamInputSchema),z.lazy(() => TeamTournamentCreateWithoutTeamInputSchema).array(),z.lazy(() => TeamTournamentUncheckedCreateWithoutTeamInputSchema),z.lazy(() => TeamTournamentUncheckedCreateWithoutTeamInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamTournamentCreateOrConnectWithoutTeamInputSchema),z.lazy(() => TeamTournamentCreateOrConnectWithoutTeamInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TeamTournamentCreateManyTeamInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TeamTournamentWhereUniqueInputSchema),z.lazy(() => TeamTournamentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MatchCreateNestedManyWithoutTeamAInputSchema: z.ZodType<Prisma.MatchCreateNestedManyWithoutTeamAInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutTeamAInputSchema),z.lazy(() => MatchCreateWithoutTeamAInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutTeamAInputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeamAInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutTeamAInputSchema),z.lazy(() => MatchCreateOrConnectWithoutTeamAInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyTeamAInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MatchCreateNestedManyWithoutTeamBInputSchema: z.ZodType<Prisma.MatchCreateNestedManyWithoutTeamBInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutTeamBInputSchema),z.lazy(() => MatchCreateWithoutTeamBInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutTeamBInputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeamBInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutTeamBInputSchema),z.lazy(() => MatchCreateOrConnectWithoutTeamBInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyTeamBInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MatchCreateNestedManyWithoutWinnerInputSchema: z.ZodType<Prisma.MatchCreateNestedManyWithoutWinnerInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutWinnerInputSchema),z.lazy(() => MatchCreateWithoutWinnerInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutWinnerInputSchema),z.lazy(() => MatchUncheckedCreateWithoutWinnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutWinnerInputSchema),z.lazy(() => MatchCreateOrConnectWithoutWinnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyWinnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RoundTeamCreateNestedManyWithoutTeamInputSchema: z.ZodType<Prisma.RoundTeamCreateNestedManyWithoutTeamInput> = z.object({
  create: z.union([ z.lazy(() => RoundTeamCreateWithoutTeamInputSchema),z.lazy(() => RoundTeamCreateWithoutTeamInputSchema).array(),z.lazy(() => RoundTeamUncheckedCreateWithoutTeamInputSchema),z.lazy(() => RoundTeamUncheckedCreateWithoutTeamInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoundTeamCreateOrConnectWithoutTeamInputSchema),z.lazy(() => RoundTeamCreateOrConnectWithoutTeamInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RoundTeamCreateManyTeamInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RoundTeamWhereUniqueInputSchema),z.lazy(() => RoundTeamWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PlayerUncheckedCreateNestedManyWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUncheckedCreateNestedManyWithoutTeamInput> = z.object({
  create: z.union([ z.lazy(() => PlayerCreateWithoutTeamInputSchema),z.lazy(() => PlayerCreateWithoutTeamInputSchema).array(),z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema),z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema),z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PlayerCreateManyTeamInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PlayerWhereUniqueInputSchema),z.lazy(() => PlayerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TeamTournamentUncheckedCreateNestedManyWithoutTeamInputSchema: z.ZodType<Prisma.TeamTournamentUncheckedCreateNestedManyWithoutTeamInput> = z.object({
  create: z.union([ z.lazy(() => TeamTournamentCreateWithoutTeamInputSchema),z.lazy(() => TeamTournamentCreateWithoutTeamInputSchema).array(),z.lazy(() => TeamTournamentUncheckedCreateWithoutTeamInputSchema),z.lazy(() => TeamTournamentUncheckedCreateWithoutTeamInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamTournamentCreateOrConnectWithoutTeamInputSchema),z.lazy(() => TeamTournamentCreateOrConnectWithoutTeamInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TeamTournamentCreateManyTeamInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TeamTournamentWhereUniqueInputSchema),z.lazy(() => TeamTournamentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MatchUncheckedCreateNestedManyWithoutTeamAInputSchema: z.ZodType<Prisma.MatchUncheckedCreateNestedManyWithoutTeamAInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutTeamAInputSchema),z.lazy(() => MatchCreateWithoutTeamAInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutTeamAInputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeamAInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutTeamAInputSchema),z.lazy(() => MatchCreateOrConnectWithoutTeamAInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyTeamAInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MatchUncheckedCreateNestedManyWithoutTeamBInputSchema: z.ZodType<Prisma.MatchUncheckedCreateNestedManyWithoutTeamBInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutTeamBInputSchema),z.lazy(() => MatchCreateWithoutTeamBInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutTeamBInputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeamBInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutTeamBInputSchema),z.lazy(() => MatchCreateOrConnectWithoutTeamBInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyTeamBInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MatchUncheckedCreateNestedManyWithoutWinnerInputSchema: z.ZodType<Prisma.MatchUncheckedCreateNestedManyWithoutWinnerInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutWinnerInputSchema),z.lazy(() => MatchCreateWithoutWinnerInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutWinnerInputSchema),z.lazy(() => MatchUncheckedCreateWithoutWinnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutWinnerInputSchema),z.lazy(() => MatchCreateOrConnectWithoutWinnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyWinnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RoundTeamUncheckedCreateNestedManyWithoutTeamInputSchema: z.ZodType<Prisma.RoundTeamUncheckedCreateNestedManyWithoutTeamInput> = z.object({
  create: z.union([ z.lazy(() => RoundTeamCreateWithoutTeamInputSchema),z.lazy(() => RoundTeamCreateWithoutTeamInputSchema).array(),z.lazy(() => RoundTeamUncheckedCreateWithoutTeamInputSchema),z.lazy(() => RoundTeamUncheckedCreateWithoutTeamInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoundTeamCreateOrConnectWithoutTeamInputSchema),z.lazy(() => RoundTeamCreateOrConnectWithoutTeamInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RoundTeamCreateManyTeamInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RoundTeamWhereUniqueInputSchema),z.lazy(() => RoundTeamWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PlayerUpdateManyWithoutTeamNestedInputSchema: z.ZodType<Prisma.PlayerUpdateManyWithoutTeamNestedInput> = z.object({
  create: z.union([ z.lazy(() => PlayerCreateWithoutTeamInputSchema),z.lazy(() => PlayerCreateWithoutTeamInputSchema).array(),z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema),z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema),z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PlayerUpsertWithWhereUniqueWithoutTeamInputSchema),z.lazy(() => PlayerUpsertWithWhereUniqueWithoutTeamInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PlayerCreateManyTeamInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PlayerWhereUniqueInputSchema),z.lazy(() => PlayerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PlayerWhereUniqueInputSchema),z.lazy(() => PlayerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PlayerWhereUniqueInputSchema),z.lazy(() => PlayerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PlayerWhereUniqueInputSchema),z.lazy(() => PlayerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PlayerUpdateWithWhereUniqueWithoutTeamInputSchema),z.lazy(() => PlayerUpdateWithWhereUniqueWithoutTeamInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PlayerUpdateManyWithWhereWithoutTeamInputSchema),z.lazy(() => PlayerUpdateManyWithWhereWithoutTeamInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PlayerScalarWhereInputSchema),z.lazy(() => PlayerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TeamTournamentUpdateManyWithoutTeamNestedInputSchema: z.ZodType<Prisma.TeamTournamentUpdateManyWithoutTeamNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamTournamentCreateWithoutTeamInputSchema),z.lazy(() => TeamTournamentCreateWithoutTeamInputSchema).array(),z.lazy(() => TeamTournamentUncheckedCreateWithoutTeamInputSchema),z.lazy(() => TeamTournamentUncheckedCreateWithoutTeamInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamTournamentCreateOrConnectWithoutTeamInputSchema),z.lazy(() => TeamTournamentCreateOrConnectWithoutTeamInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TeamTournamentUpsertWithWhereUniqueWithoutTeamInputSchema),z.lazy(() => TeamTournamentUpsertWithWhereUniqueWithoutTeamInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TeamTournamentCreateManyTeamInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TeamTournamentWhereUniqueInputSchema),z.lazy(() => TeamTournamentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TeamTournamentWhereUniqueInputSchema),z.lazy(() => TeamTournamentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TeamTournamentWhereUniqueInputSchema),z.lazy(() => TeamTournamentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TeamTournamentWhereUniqueInputSchema),z.lazy(() => TeamTournamentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TeamTournamentUpdateWithWhereUniqueWithoutTeamInputSchema),z.lazy(() => TeamTournamentUpdateWithWhereUniqueWithoutTeamInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TeamTournamentUpdateManyWithWhereWithoutTeamInputSchema),z.lazy(() => TeamTournamentUpdateManyWithWhereWithoutTeamInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TeamTournamentScalarWhereInputSchema),z.lazy(() => TeamTournamentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MatchUpdateManyWithoutTeamANestedInputSchema: z.ZodType<Prisma.MatchUpdateManyWithoutTeamANestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutTeamAInputSchema),z.lazy(() => MatchCreateWithoutTeamAInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutTeamAInputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeamAInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutTeamAInputSchema),z.lazy(() => MatchCreateOrConnectWithoutTeamAInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchUpsertWithWhereUniqueWithoutTeamAInputSchema),z.lazy(() => MatchUpsertWithWhereUniqueWithoutTeamAInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyTeamAInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchUpdateWithWhereUniqueWithoutTeamAInputSchema),z.lazy(() => MatchUpdateWithWhereUniqueWithoutTeamAInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchUpdateManyWithWhereWithoutTeamAInputSchema),z.lazy(() => MatchUpdateManyWithWhereWithoutTeamAInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MatchUpdateManyWithoutTeamBNestedInputSchema: z.ZodType<Prisma.MatchUpdateManyWithoutTeamBNestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutTeamBInputSchema),z.lazy(() => MatchCreateWithoutTeamBInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutTeamBInputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeamBInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutTeamBInputSchema),z.lazy(() => MatchCreateOrConnectWithoutTeamBInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchUpsertWithWhereUniqueWithoutTeamBInputSchema),z.lazy(() => MatchUpsertWithWhereUniqueWithoutTeamBInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyTeamBInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchUpdateWithWhereUniqueWithoutTeamBInputSchema),z.lazy(() => MatchUpdateWithWhereUniqueWithoutTeamBInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchUpdateManyWithWhereWithoutTeamBInputSchema),z.lazy(() => MatchUpdateManyWithWhereWithoutTeamBInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MatchUpdateManyWithoutWinnerNestedInputSchema: z.ZodType<Prisma.MatchUpdateManyWithoutWinnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutWinnerInputSchema),z.lazy(() => MatchCreateWithoutWinnerInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutWinnerInputSchema),z.lazy(() => MatchUncheckedCreateWithoutWinnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutWinnerInputSchema),z.lazy(() => MatchCreateOrConnectWithoutWinnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchUpsertWithWhereUniqueWithoutWinnerInputSchema),z.lazy(() => MatchUpsertWithWhereUniqueWithoutWinnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyWinnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchUpdateWithWhereUniqueWithoutWinnerInputSchema),z.lazy(() => MatchUpdateWithWhereUniqueWithoutWinnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchUpdateManyWithWhereWithoutWinnerInputSchema),z.lazy(() => MatchUpdateManyWithWhereWithoutWinnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RoundTeamUpdateManyWithoutTeamNestedInputSchema: z.ZodType<Prisma.RoundTeamUpdateManyWithoutTeamNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoundTeamCreateWithoutTeamInputSchema),z.lazy(() => RoundTeamCreateWithoutTeamInputSchema).array(),z.lazy(() => RoundTeamUncheckedCreateWithoutTeamInputSchema),z.lazy(() => RoundTeamUncheckedCreateWithoutTeamInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoundTeamCreateOrConnectWithoutTeamInputSchema),z.lazy(() => RoundTeamCreateOrConnectWithoutTeamInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RoundTeamUpsertWithWhereUniqueWithoutTeamInputSchema),z.lazy(() => RoundTeamUpsertWithWhereUniqueWithoutTeamInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RoundTeamCreateManyTeamInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RoundTeamWhereUniqueInputSchema),z.lazy(() => RoundTeamWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RoundTeamWhereUniqueInputSchema),z.lazy(() => RoundTeamWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RoundTeamWhereUniqueInputSchema),z.lazy(() => RoundTeamWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoundTeamWhereUniqueInputSchema),z.lazy(() => RoundTeamWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RoundTeamUpdateWithWhereUniqueWithoutTeamInputSchema),z.lazy(() => RoundTeamUpdateWithWhereUniqueWithoutTeamInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RoundTeamUpdateManyWithWhereWithoutTeamInputSchema),z.lazy(() => RoundTeamUpdateManyWithWhereWithoutTeamInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RoundTeamScalarWhereInputSchema),z.lazy(() => RoundTeamScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PlayerUncheckedUpdateManyWithoutTeamNestedInputSchema: z.ZodType<Prisma.PlayerUncheckedUpdateManyWithoutTeamNestedInput> = z.object({
  create: z.union([ z.lazy(() => PlayerCreateWithoutTeamInputSchema),z.lazy(() => PlayerCreateWithoutTeamInputSchema).array(),z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema),z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema),z.lazy(() => PlayerCreateOrConnectWithoutTeamInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PlayerUpsertWithWhereUniqueWithoutTeamInputSchema),z.lazy(() => PlayerUpsertWithWhereUniqueWithoutTeamInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PlayerCreateManyTeamInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PlayerWhereUniqueInputSchema),z.lazy(() => PlayerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PlayerWhereUniqueInputSchema),z.lazy(() => PlayerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PlayerWhereUniqueInputSchema),z.lazy(() => PlayerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PlayerWhereUniqueInputSchema),z.lazy(() => PlayerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PlayerUpdateWithWhereUniqueWithoutTeamInputSchema),z.lazy(() => PlayerUpdateWithWhereUniqueWithoutTeamInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PlayerUpdateManyWithWhereWithoutTeamInputSchema),z.lazy(() => PlayerUpdateManyWithWhereWithoutTeamInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PlayerScalarWhereInputSchema),z.lazy(() => PlayerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TeamTournamentUncheckedUpdateManyWithoutTeamNestedInputSchema: z.ZodType<Prisma.TeamTournamentUncheckedUpdateManyWithoutTeamNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamTournamentCreateWithoutTeamInputSchema),z.lazy(() => TeamTournamentCreateWithoutTeamInputSchema).array(),z.lazy(() => TeamTournamentUncheckedCreateWithoutTeamInputSchema),z.lazy(() => TeamTournamentUncheckedCreateWithoutTeamInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamTournamentCreateOrConnectWithoutTeamInputSchema),z.lazy(() => TeamTournamentCreateOrConnectWithoutTeamInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TeamTournamentUpsertWithWhereUniqueWithoutTeamInputSchema),z.lazy(() => TeamTournamentUpsertWithWhereUniqueWithoutTeamInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TeamTournamentCreateManyTeamInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TeamTournamentWhereUniqueInputSchema),z.lazy(() => TeamTournamentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TeamTournamentWhereUniqueInputSchema),z.lazy(() => TeamTournamentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TeamTournamentWhereUniqueInputSchema),z.lazy(() => TeamTournamentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TeamTournamentWhereUniqueInputSchema),z.lazy(() => TeamTournamentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TeamTournamentUpdateWithWhereUniqueWithoutTeamInputSchema),z.lazy(() => TeamTournamentUpdateWithWhereUniqueWithoutTeamInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TeamTournamentUpdateManyWithWhereWithoutTeamInputSchema),z.lazy(() => TeamTournamentUpdateManyWithWhereWithoutTeamInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TeamTournamentScalarWhereInputSchema),z.lazy(() => TeamTournamentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MatchUncheckedUpdateManyWithoutTeamANestedInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyWithoutTeamANestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutTeamAInputSchema),z.lazy(() => MatchCreateWithoutTeamAInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutTeamAInputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeamAInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutTeamAInputSchema),z.lazy(() => MatchCreateOrConnectWithoutTeamAInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchUpsertWithWhereUniqueWithoutTeamAInputSchema),z.lazy(() => MatchUpsertWithWhereUniqueWithoutTeamAInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyTeamAInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchUpdateWithWhereUniqueWithoutTeamAInputSchema),z.lazy(() => MatchUpdateWithWhereUniqueWithoutTeamAInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchUpdateManyWithWhereWithoutTeamAInputSchema),z.lazy(() => MatchUpdateManyWithWhereWithoutTeamAInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MatchUncheckedUpdateManyWithoutTeamBNestedInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyWithoutTeamBNestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutTeamBInputSchema),z.lazy(() => MatchCreateWithoutTeamBInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutTeamBInputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeamBInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutTeamBInputSchema),z.lazy(() => MatchCreateOrConnectWithoutTeamBInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchUpsertWithWhereUniqueWithoutTeamBInputSchema),z.lazy(() => MatchUpsertWithWhereUniqueWithoutTeamBInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyTeamBInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchUpdateWithWhereUniqueWithoutTeamBInputSchema),z.lazy(() => MatchUpdateWithWhereUniqueWithoutTeamBInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchUpdateManyWithWhereWithoutTeamBInputSchema),z.lazy(() => MatchUpdateManyWithWhereWithoutTeamBInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MatchUncheckedUpdateManyWithoutWinnerNestedInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyWithoutWinnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutWinnerInputSchema),z.lazy(() => MatchCreateWithoutWinnerInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutWinnerInputSchema),z.lazy(() => MatchUncheckedCreateWithoutWinnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutWinnerInputSchema),z.lazy(() => MatchCreateOrConnectWithoutWinnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchUpsertWithWhereUniqueWithoutWinnerInputSchema),z.lazy(() => MatchUpsertWithWhereUniqueWithoutWinnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyWinnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchUpdateWithWhereUniqueWithoutWinnerInputSchema),z.lazy(() => MatchUpdateWithWhereUniqueWithoutWinnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchUpdateManyWithWhereWithoutWinnerInputSchema),z.lazy(() => MatchUpdateManyWithWhereWithoutWinnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RoundTeamUncheckedUpdateManyWithoutTeamNestedInputSchema: z.ZodType<Prisma.RoundTeamUncheckedUpdateManyWithoutTeamNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoundTeamCreateWithoutTeamInputSchema),z.lazy(() => RoundTeamCreateWithoutTeamInputSchema).array(),z.lazy(() => RoundTeamUncheckedCreateWithoutTeamInputSchema),z.lazy(() => RoundTeamUncheckedCreateWithoutTeamInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoundTeamCreateOrConnectWithoutTeamInputSchema),z.lazy(() => RoundTeamCreateOrConnectWithoutTeamInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RoundTeamUpsertWithWhereUniqueWithoutTeamInputSchema),z.lazy(() => RoundTeamUpsertWithWhereUniqueWithoutTeamInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RoundTeamCreateManyTeamInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RoundTeamWhereUniqueInputSchema),z.lazy(() => RoundTeamWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RoundTeamWhereUniqueInputSchema),z.lazy(() => RoundTeamWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RoundTeamWhereUniqueInputSchema),z.lazy(() => RoundTeamWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoundTeamWhereUniqueInputSchema),z.lazy(() => RoundTeamWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RoundTeamUpdateWithWhereUniqueWithoutTeamInputSchema),z.lazy(() => RoundTeamUpdateWithWhereUniqueWithoutTeamInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RoundTeamUpdateManyWithWhereWithoutTeamInputSchema),z.lazy(() => RoundTeamUpdateManyWithWhereWithoutTeamInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RoundTeamScalarWhereInputSchema),z.lazy(() => RoundTeamScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TeamCreateNestedOneWithoutPlayersInputSchema: z.ZodType<Prisma.TeamCreateNestedOneWithoutPlayersInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutPlayersInputSchema),z.lazy(() => TeamUncheckedCreateWithoutPlayersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutPlayersInputSchema).optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional()
}).strict();

export const TeamUpdateOneWithoutPlayersNestedInputSchema: z.ZodType<Prisma.TeamUpdateOneWithoutPlayersNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutPlayersInputSchema),z.lazy(() => TeamUncheckedCreateWithoutPlayersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutPlayersInputSchema).optional(),
  upsert: z.lazy(() => TeamUpsertWithoutPlayersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => TeamWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => TeamWhereInputSchema) ]).optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TeamUpdateToOneWithWhereWithoutPlayersInputSchema),z.lazy(() => TeamUpdateWithoutPlayersInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutPlayersInputSchema) ]).optional(),
}).strict();

export const TournamentCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.TournamentCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => TournamentCreateWithoutEventInputSchema),z.lazy(() => TournamentCreateWithoutEventInputSchema).array(),z.lazy(() => TournamentUncheckedCreateWithoutEventInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TournamentCreateOrConnectWithoutEventInputSchema),z.lazy(() => TournamentCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TournamentCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TournamentWhereUniqueInputSchema),z.lazy(() => TournamentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TournamentUncheckedCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.TournamentUncheckedCreateNestedManyWithoutEventInput> = z.object({
  create: z.union([ z.lazy(() => TournamentCreateWithoutEventInputSchema),z.lazy(() => TournamentCreateWithoutEventInputSchema).array(),z.lazy(() => TournamentUncheckedCreateWithoutEventInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TournamentCreateOrConnectWithoutEventInputSchema),z.lazy(() => TournamentCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TournamentCreateManyEventInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TournamentWhereUniqueInputSchema),z.lazy(() => TournamentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TournamentUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.TournamentUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => TournamentCreateWithoutEventInputSchema),z.lazy(() => TournamentCreateWithoutEventInputSchema).array(),z.lazy(() => TournamentUncheckedCreateWithoutEventInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TournamentCreateOrConnectWithoutEventInputSchema),z.lazy(() => TournamentCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TournamentUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => TournamentUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TournamentCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TournamentWhereUniqueInputSchema),z.lazy(() => TournamentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TournamentWhereUniqueInputSchema),z.lazy(() => TournamentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TournamentWhereUniqueInputSchema),z.lazy(() => TournamentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TournamentWhereUniqueInputSchema),z.lazy(() => TournamentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TournamentUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => TournamentUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TournamentUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => TournamentUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TournamentScalarWhereInputSchema),z.lazy(() => TournamentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TournamentUncheckedUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.TournamentUncheckedUpdateManyWithoutEventNestedInput> = z.object({
  create: z.union([ z.lazy(() => TournamentCreateWithoutEventInputSchema),z.lazy(() => TournamentCreateWithoutEventInputSchema).array(),z.lazy(() => TournamentUncheckedCreateWithoutEventInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutEventInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TournamentCreateOrConnectWithoutEventInputSchema),z.lazy(() => TournamentCreateOrConnectWithoutEventInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TournamentUpsertWithWhereUniqueWithoutEventInputSchema),z.lazy(() => TournamentUpsertWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TournamentCreateManyEventInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TournamentWhereUniqueInputSchema),z.lazy(() => TournamentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TournamentWhereUniqueInputSchema),z.lazy(() => TournamentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TournamentWhereUniqueInputSchema),z.lazy(() => TournamentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TournamentWhereUniqueInputSchema),z.lazy(() => TournamentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TournamentUpdateWithWhereUniqueWithoutEventInputSchema),z.lazy(() => TournamentUpdateWithWhereUniqueWithoutEventInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TournamentUpdateManyWithWhereWithoutEventInputSchema),z.lazy(() => TournamentUpdateManyWithWhereWithoutEventInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TournamentScalarWhereInputSchema),z.lazy(() => TournamentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EventCreateNestedOneWithoutTournamentsInputSchema: z.ZodType<Prisma.EventCreateNestedOneWithoutTournamentsInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutTournamentsInputSchema),z.lazy(() => EventUncheckedCreateWithoutTournamentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutTournamentsInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional()
}).strict();

export const PhaseCreateNestedManyWithoutTournamentInputSchema: z.ZodType<Prisma.PhaseCreateNestedManyWithoutTournamentInput> = z.object({
  create: z.union([ z.lazy(() => PhaseCreateWithoutTournamentInputSchema),z.lazy(() => PhaseCreateWithoutTournamentInputSchema).array(),z.lazy(() => PhaseUncheckedCreateWithoutTournamentInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutTournamentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PhaseCreateOrConnectWithoutTournamentInputSchema),z.lazy(() => PhaseCreateOrConnectWithoutTournamentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PhaseCreateManyTournamentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PhaseWhereUniqueInputSchema),z.lazy(() => PhaseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TeamTournamentCreateNestedManyWithoutTournamentInputSchema: z.ZodType<Prisma.TeamTournamentCreateNestedManyWithoutTournamentInput> = z.object({
  create: z.union([ z.lazy(() => TeamTournamentCreateWithoutTournamentInputSchema),z.lazy(() => TeamTournamentCreateWithoutTournamentInputSchema).array(),z.lazy(() => TeamTournamentUncheckedCreateWithoutTournamentInputSchema),z.lazy(() => TeamTournamentUncheckedCreateWithoutTournamentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamTournamentCreateOrConnectWithoutTournamentInputSchema),z.lazy(() => TeamTournamentCreateOrConnectWithoutTournamentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TeamTournamentCreateManyTournamentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TeamTournamentWhereUniqueInputSchema),z.lazy(() => TeamTournamentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PhaseUncheckedCreateNestedManyWithoutTournamentInputSchema: z.ZodType<Prisma.PhaseUncheckedCreateNestedManyWithoutTournamentInput> = z.object({
  create: z.union([ z.lazy(() => PhaseCreateWithoutTournamentInputSchema),z.lazy(() => PhaseCreateWithoutTournamentInputSchema).array(),z.lazy(() => PhaseUncheckedCreateWithoutTournamentInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutTournamentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PhaseCreateOrConnectWithoutTournamentInputSchema),z.lazy(() => PhaseCreateOrConnectWithoutTournamentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PhaseCreateManyTournamentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PhaseWhereUniqueInputSchema),z.lazy(() => PhaseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TeamTournamentUncheckedCreateNestedManyWithoutTournamentInputSchema: z.ZodType<Prisma.TeamTournamentUncheckedCreateNestedManyWithoutTournamentInput> = z.object({
  create: z.union([ z.lazy(() => TeamTournamentCreateWithoutTournamentInputSchema),z.lazy(() => TeamTournamentCreateWithoutTournamentInputSchema).array(),z.lazy(() => TeamTournamentUncheckedCreateWithoutTournamentInputSchema),z.lazy(() => TeamTournamentUncheckedCreateWithoutTournamentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamTournamentCreateOrConnectWithoutTournamentInputSchema),z.lazy(() => TeamTournamentCreateOrConnectWithoutTournamentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TeamTournamentCreateManyTournamentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TeamTournamentWhereUniqueInputSchema),z.lazy(() => TeamTournamentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EventUpdateOneRequiredWithoutTournamentsNestedInputSchema: z.ZodType<Prisma.EventUpdateOneRequiredWithoutTournamentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => EventCreateWithoutTournamentsInputSchema),z.lazy(() => EventUncheckedCreateWithoutTournamentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => EventCreateOrConnectWithoutTournamentsInputSchema).optional(),
  upsert: z.lazy(() => EventUpsertWithoutTournamentsInputSchema).optional(),
  connect: z.lazy(() => EventWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => EventUpdateToOneWithWhereWithoutTournamentsInputSchema),z.lazy(() => EventUpdateWithoutTournamentsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutTournamentsInputSchema) ]).optional(),
}).strict();

export const PhaseUpdateManyWithoutTournamentNestedInputSchema: z.ZodType<Prisma.PhaseUpdateManyWithoutTournamentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PhaseCreateWithoutTournamentInputSchema),z.lazy(() => PhaseCreateWithoutTournamentInputSchema).array(),z.lazy(() => PhaseUncheckedCreateWithoutTournamentInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutTournamentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PhaseCreateOrConnectWithoutTournamentInputSchema),z.lazy(() => PhaseCreateOrConnectWithoutTournamentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PhaseUpsertWithWhereUniqueWithoutTournamentInputSchema),z.lazy(() => PhaseUpsertWithWhereUniqueWithoutTournamentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PhaseCreateManyTournamentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PhaseWhereUniqueInputSchema),z.lazy(() => PhaseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PhaseWhereUniqueInputSchema),z.lazy(() => PhaseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PhaseWhereUniqueInputSchema),z.lazy(() => PhaseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PhaseWhereUniqueInputSchema),z.lazy(() => PhaseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PhaseUpdateWithWhereUniqueWithoutTournamentInputSchema),z.lazy(() => PhaseUpdateWithWhereUniqueWithoutTournamentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PhaseUpdateManyWithWhereWithoutTournamentInputSchema),z.lazy(() => PhaseUpdateManyWithWhereWithoutTournamentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PhaseScalarWhereInputSchema),z.lazy(() => PhaseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TeamTournamentUpdateManyWithoutTournamentNestedInputSchema: z.ZodType<Prisma.TeamTournamentUpdateManyWithoutTournamentNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamTournamentCreateWithoutTournamentInputSchema),z.lazy(() => TeamTournamentCreateWithoutTournamentInputSchema).array(),z.lazy(() => TeamTournamentUncheckedCreateWithoutTournamentInputSchema),z.lazy(() => TeamTournamentUncheckedCreateWithoutTournamentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamTournamentCreateOrConnectWithoutTournamentInputSchema),z.lazy(() => TeamTournamentCreateOrConnectWithoutTournamentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TeamTournamentUpsertWithWhereUniqueWithoutTournamentInputSchema),z.lazy(() => TeamTournamentUpsertWithWhereUniqueWithoutTournamentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TeamTournamentCreateManyTournamentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TeamTournamentWhereUniqueInputSchema),z.lazy(() => TeamTournamentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TeamTournamentWhereUniqueInputSchema),z.lazy(() => TeamTournamentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TeamTournamentWhereUniqueInputSchema),z.lazy(() => TeamTournamentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TeamTournamentWhereUniqueInputSchema),z.lazy(() => TeamTournamentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TeamTournamentUpdateWithWhereUniqueWithoutTournamentInputSchema),z.lazy(() => TeamTournamentUpdateWithWhereUniqueWithoutTournamentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TeamTournamentUpdateManyWithWhereWithoutTournamentInputSchema),z.lazy(() => TeamTournamentUpdateManyWithWhereWithoutTournamentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TeamTournamentScalarWhereInputSchema),z.lazy(() => TeamTournamentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PhaseUncheckedUpdateManyWithoutTournamentNestedInputSchema: z.ZodType<Prisma.PhaseUncheckedUpdateManyWithoutTournamentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PhaseCreateWithoutTournamentInputSchema),z.lazy(() => PhaseCreateWithoutTournamentInputSchema).array(),z.lazy(() => PhaseUncheckedCreateWithoutTournamentInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutTournamentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PhaseCreateOrConnectWithoutTournamentInputSchema),z.lazy(() => PhaseCreateOrConnectWithoutTournamentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PhaseUpsertWithWhereUniqueWithoutTournamentInputSchema),z.lazy(() => PhaseUpsertWithWhereUniqueWithoutTournamentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PhaseCreateManyTournamentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PhaseWhereUniqueInputSchema),z.lazy(() => PhaseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PhaseWhereUniqueInputSchema),z.lazy(() => PhaseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PhaseWhereUniqueInputSchema),z.lazy(() => PhaseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PhaseWhereUniqueInputSchema),z.lazy(() => PhaseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PhaseUpdateWithWhereUniqueWithoutTournamentInputSchema),z.lazy(() => PhaseUpdateWithWhereUniqueWithoutTournamentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PhaseUpdateManyWithWhereWithoutTournamentInputSchema),z.lazy(() => PhaseUpdateManyWithWhereWithoutTournamentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PhaseScalarWhereInputSchema),z.lazy(() => PhaseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TeamTournamentUncheckedUpdateManyWithoutTournamentNestedInputSchema: z.ZodType<Prisma.TeamTournamentUncheckedUpdateManyWithoutTournamentNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamTournamentCreateWithoutTournamentInputSchema),z.lazy(() => TeamTournamentCreateWithoutTournamentInputSchema).array(),z.lazy(() => TeamTournamentUncheckedCreateWithoutTournamentInputSchema),z.lazy(() => TeamTournamentUncheckedCreateWithoutTournamentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TeamTournamentCreateOrConnectWithoutTournamentInputSchema),z.lazy(() => TeamTournamentCreateOrConnectWithoutTournamentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TeamTournamentUpsertWithWhereUniqueWithoutTournamentInputSchema),z.lazy(() => TeamTournamentUpsertWithWhereUniqueWithoutTournamentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TeamTournamentCreateManyTournamentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TeamTournamentWhereUniqueInputSchema),z.lazy(() => TeamTournamentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TeamTournamentWhereUniqueInputSchema),z.lazy(() => TeamTournamentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TeamTournamentWhereUniqueInputSchema),z.lazy(() => TeamTournamentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TeamTournamentWhereUniqueInputSchema),z.lazy(() => TeamTournamentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TeamTournamentUpdateWithWhereUniqueWithoutTournamentInputSchema),z.lazy(() => TeamTournamentUpdateWithWhereUniqueWithoutTournamentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TeamTournamentUpdateManyWithWhereWithoutTournamentInputSchema),z.lazy(() => TeamTournamentUpdateManyWithWhereWithoutTournamentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TeamTournamentScalarWhereInputSchema),z.lazy(() => TeamTournamentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TournamentCreateNestedOneWithoutTeamsInputSchema: z.ZodType<Prisma.TournamentCreateNestedOneWithoutTeamsInput> = z.object({
  create: z.union([ z.lazy(() => TournamentCreateWithoutTeamsInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutTeamsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TournamentCreateOrConnectWithoutTeamsInputSchema).optional(),
  connect: z.lazy(() => TournamentWhereUniqueInputSchema).optional()
}).strict();

export const TeamCreateNestedOneWithoutTeamInTournamentsInputSchema: z.ZodType<Prisma.TeamCreateNestedOneWithoutTeamInTournamentsInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutTeamInTournamentsInputSchema),z.lazy(() => TeamUncheckedCreateWithoutTeamInTournamentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutTeamInTournamentsInputSchema).optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional()
}).strict();

export const TournamentUpdateOneRequiredWithoutTeamsNestedInputSchema: z.ZodType<Prisma.TournamentUpdateOneRequiredWithoutTeamsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TournamentCreateWithoutTeamsInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutTeamsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TournamentCreateOrConnectWithoutTeamsInputSchema).optional(),
  upsert: z.lazy(() => TournamentUpsertWithoutTeamsInputSchema).optional(),
  connect: z.lazy(() => TournamentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TournamentUpdateToOneWithWhereWithoutTeamsInputSchema),z.lazy(() => TournamentUpdateWithoutTeamsInputSchema),z.lazy(() => TournamentUncheckedUpdateWithoutTeamsInputSchema) ]).optional(),
}).strict();

export const TeamUpdateOneRequiredWithoutTeamInTournamentsNestedInputSchema: z.ZodType<Prisma.TeamUpdateOneRequiredWithoutTeamInTournamentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutTeamInTournamentsInputSchema),z.lazy(() => TeamUncheckedCreateWithoutTeamInTournamentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutTeamInTournamentsInputSchema).optional(),
  upsert: z.lazy(() => TeamUpsertWithoutTeamInTournamentsInputSchema).optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TeamUpdateToOneWithWhereWithoutTeamInTournamentsInputSchema),z.lazy(() => TeamUpdateWithoutTeamInTournamentsInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutTeamInTournamentsInputSchema) ]).optional(),
}).strict();

export const TournamentCreateNestedOneWithoutPhasesInputSchema: z.ZodType<Prisma.TournamentCreateNestedOneWithoutPhasesInput> = z.object({
  create: z.union([ z.lazy(() => TournamentCreateWithoutPhasesInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutPhasesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TournamentCreateOrConnectWithoutPhasesInputSchema).optional(),
  connect: z.lazy(() => TournamentWhereUniqueInputSchema).optional()
}).strict();

export const RoundCreateNestedManyWithoutPhaseInputSchema: z.ZodType<Prisma.RoundCreateNestedManyWithoutPhaseInput> = z.object({
  create: z.union([ z.lazy(() => RoundCreateWithoutPhaseInputSchema),z.lazy(() => RoundCreateWithoutPhaseInputSchema).array(),z.lazy(() => RoundUncheckedCreateWithoutPhaseInputSchema),z.lazy(() => RoundUncheckedCreateWithoutPhaseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoundCreateOrConnectWithoutPhaseInputSchema),z.lazy(() => RoundCreateOrConnectWithoutPhaseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RoundCreateManyPhaseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RoundWhereUniqueInputSchema),z.lazy(() => RoundWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PhaseCreateNestedOneWithoutNextPhaseRelationInputSchema: z.ZodType<Prisma.PhaseCreateNestedOneWithoutNextPhaseRelationInput> = z.object({
  create: z.union([ z.lazy(() => PhaseCreateWithoutNextPhaseRelationInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutNextPhaseRelationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PhaseCreateOrConnectWithoutNextPhaseRelationInputSchema).optional(),
  connect: z.lazy(() => PhaseWhereUniqueInputSchema).optional()
}).strict();

export const PhaseCreateNestedOneWithoutPreviousPhaseInputSchema: z.ZodType<Prisma.PhaseCreateNestedOneWithoutPreviousPhaseInput> = z.object({
  create: z.union([ z.lazy(() => PhaseCreateWithoutPreviousPhaseInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutPreviousPhaseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PhaseCreateOrConnectWithoutPreviousPhaseInputSchema).optional(),
  connect: z.lazy(() => PhaseWhereUniqueInputSchema).optional()
}).strict();

export const PhaseCreateNestedOneWithoutPreviousPhaseRelationInputSchema: z.ZodType<Prisma.PhaseCreateNestedOneWithoutPreviousPhaseRelationInput> = z.object({
  create: z.union([ z.lazy(() => PhaseCreateWithoutPreviousPhaseRelationInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutPreviousPhaseRelationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PhaseCreateOrConnectWithoutPreviousPhaseRelationInputSchema).optional(),
  connect: z.lazy(() => PhaseWhereUniqueInputSchema).optional()
}).strict();

export const PhaseCreateNestedOneWithoutNextPhaseInputSchema: z.ZodType<Prisma.PhaseCreateNestedOneWithoutNextPhaseInput> = z.object({
  create: z.union([ z.lazy(() => PhaseCreateWithoutNextPhaseInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutNextPhaseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PhaseCreateOrConnectWithoutNextPhaseInputSchema).optional(),
  connect: z.lazy(() => PhaseWhereUniqueInputSchema).optional()
}).strict();

export const RoundUncheckedCreateNestedManyWithoutPhaseInputSchema: z.ZodType<Prisma.RoundUncheckedCreateNestedManyWithoutPhaseInput> = z.object({
  create: z.union([ z.lazy(() => RoundCreateWithoutPhaseInputSchema),z.lazy(() => RoundCreateWithoutPhaseInputSchema).array(),z.lazy(() => RoundUncheckedCreateWithoutPhaseInputSchema),z.lazy(() => RoundUncheckedCreateWithoutPhaseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoundCreateOrConnectWithoutPhaseInputSchema),z.lazy(() => RoundCreateOrConnectWithoutPhaseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RoundCreateManyPhaseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RoundWhereUniqueInputSchema),z.lazy(() => RoundWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PhaseUncheckedCreateNestedOneWithoutPreviousPhaseInputSchema: z.ZodType<Prisma.PhaseUncheckedCreateNestedOneWithoutPreviousPhaseInput> = z.object({
  create: z.union([ z.lazy(() => PhaseCreateWithoutPreviousPhaseInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutPreviousPhaseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PhaseCreateOrConnectWithoutPreviousPhaseInputSchema).optional(),
  connect: z.lazy(() => PhaseWhereUniqueInputSchema).optional()
}).strict();

export const PhaseUncheckedCreateNestedOneWithoutNextPhaseInputSchema: z.ZodType<Prisma.PhaseUncheckedCreateNestedOneWithoutNextPhaseInput> = z.object({
  create: z.union([ z.lazy(() => PhaseCreateWithoutNextPhaseInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutNextPhaseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PhaseCreateOrConnectWithoutNextPhaseInputSchema).optional(),
  connect: z.lazy(() => PhaseWhereUniqueInputSchema).optional()
}).strict();

export const EnumPhaseTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPhaseTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PhaseTypeSchema).optional()
}).strict();

export const TournamentUpdateOneRequiredWithoutPhasesNestedInputSchema: z.ZodType<Prisma.TournamentUpdateOneRequiredWithoutPhasesNestedInput> = z.object({
  create: z.union([ z.lazy(() => TournamentCreateWithoutPhasesInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutPhasesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TournamentCreateOrConnectWithoutPhasesInputSchema).optional(),
  upsert: z.lazy(() => TournamentUpsertWithoutPhasesInputSchema).optional(),
  connect: z.lazy(() => TournamentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TournamentUpdateToOneWithWhereWithoutPhasesInputSchema),z.lazy(() => TournamentUpdateWithoutPhasesInputSchema),z.lazy(() => TournamentUncheckedUpdateWithoutPhasesInputSchema) ]).optional(),
}).strict();

export const RoundUpdateManyWithoutPhaseNestedInputSchema: z.ZodType<Prisma.RoundUpdateManyWithoutPhaseNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoundCreateWithoutPhaseInputSchema),z.lazy(() => RoundCreateWithoutPhaseInputSchema).array(),z.lazy(() => RoundUncheckedCreateWithoutPhaseInputSchema),z.lazy(() => RoundUncheckedCreateWithoutPhaseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoundCreateOrConnectWithoutPhaseInputSchema),z.lazy(() => RoundCreateOrConnectWithoutPhaseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RoundUpsertWithWhereUniqueWithoutPhaseInputSchema),z.lazy(() => RoundUpsertWithWhereUniqueWithoutPhaseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RoundCreateManyPhaseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RoundWhereUniqueInputSchema),z.lazy(() => RoundWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RoundWhereUniqueInputSchema),z.lazy(() => RoundWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RoundWhereUniqueInputSchema),z.lazy(() => RoundWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoundWhereUniqueInputSchema),z.lazy(() => RoundWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RoundUpdateWithWhereUniqueWithoutPhaseInputSchema),z.lazy(() => RoundUpdateWithWhereUniqueWithoutPhaseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RoundUpdateManyWithWhereWithoutPhaseInputSchema),z.lazy(() => RoundUpdateManyWithWhereWithoutPhaseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RoundScalarWhereInputSchema),z.lazy(() => RoundScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PhaseUpdateOneWithoutNextPhaseRelationNestedInputSchema: z.ZodType<Prisma.PhaseUpdateOneWithoutNextPhaseRelationNestedInput> = z.object({
  create: z.union([ z.lazy(() => PhaseCreateWithoutNextPhaseRelationInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutNextPhaseRelationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PhaseCreateOrConnectWithoutNextPhaseRelationInputSchema).optional(),
  upsert: z.lazy(() => PhaseUpsertWithoutNextPhaseRelationInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PhaseWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PhaseWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PhaseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PhaseUpdateToOneWithWhereWithoutNextPhaseRelationInputSchema),z.lazy(() => PhaseUpdateWithoutNextPhaseRelationInputSchema),z.lazy(() => PhaseUncheckedUpdateWithoutNextPhaseRelationInputSchema) ]).optional(),
}).strict();

export const PhaseUpdateOneWithoutPreviousPhaseNestedInputSchema: z.ZodType<Prisma.PhaseUpdateOneWithoutPreviousPhaseNestedInput> = z.object({
  create: z.union([ z.lazy(() => PhaseCreateWithoutPreviousPhaseInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutPreviousPhaseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PhaseCreateOrConnectWithoutPreviousPhaseInputSchema).optional(),
  upsert: z.lazy(() => PhaseUpsertWithoutPreviousPhaseInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PhaseWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PhaseWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PhaseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PhaseUpdateToOneWithWhereWithoutPreviousPhaseInputSchema),z.lazy(() => PhaseUpdateWithoutPreviousPhaseInputSchema),z.lazy(() => PhaseUncheckedUpdateWithoutPreviousPhaseInputSchema) ]).optional(),
}).strict();

export const PhaseUpdateOneWithoutPreviousPhaseRelationNestedInputSchema: z.ZodType<Prisma.PhaseUpdateOneWithoutPreviousPhaseRelationNestedInput> = z.object({
  create: z.union([ z.lazy(() => PhaseCreateWithoutPreviousPhaseRelationInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutPreviousPhaseRelationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PhaseCreateOrConnectWithoutPreviousPhaseRelationInputSchema).optional(),
  upsert: z.lazy(() => PhaseUpsertWithoutPreviousPhaseRelationInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PhaseWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PhaseWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PhaseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PhaseUpdateToOneWithWhereWithoutPreviousPhaseRelationInputSchema),z.lazy(() => PhaseUpdateWithoutPreviousPhaseRelationInputSchema),z.lazy(() => PhaseUncheckedUpdateWithoutPreviousPhaseRelationInputSchema) ]).optional(),
}).strict();

export const PhaseUpdateOneWithoutNextPhaseNestedInputSchema: z.ZodType<Prisma.PhaseUpdateOneWithoutNextPhaseNestedInput> = z.object({
  create: z.union([ z.lazy(() => PhaseCreateWithoutNextPhaseInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutNextPhaseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PhaseCreateOrConnectWithoutNextPhaseInputSchema).optional(),
  upsert: z.lazy(() => PhaseUpsertWithoutNextPhaseInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PhaseWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PhaseWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PhaseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PhaseUpdateToOneWithWhereWithoutNextPhaseInputSchema),z.lazy(() => PhaseUpdateWithoutNextPhaseInputSchema),z.lazy(() => PhaseUncheckedUpdateWithoutNextPhaseInputSchema) ]).optional(),
}).strict();

export const RoundUncheckedUpdateManyWithoutPhaseNestedInputSchema: z.ZodType<Prisma.RoundUncheckedUpdateManyWithoutPhaseNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoundCreateWithoutPhaseInputSchema),z.lazy(() => RoundCreateWithoutPhaseInputSchema).array(),z.lazy(() => RoundUncheckedCreateWithoutPhaseInputSchema),z.lazy(() => RoundUncheckedCreateWithoutPhaseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoundCreateOrConnectWithoutPhaseInputSchema),z.lazy(() => RoundCreateOrConnectWithoutPhaseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RoundUpsertWithWhereUniqueWithoutPhaseInputSchema),z.lazy(() => RoundUpsertWithWhereUniqueWithoutPhaseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RoundCreateManyPhaseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RoundWhereUniqueInputSchema),z.lazy(() => RoundWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RoundWhereUniqueInputSchema),z.lazy(() => RoundWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RoundWhereUniqueInputSchema),z.lazy(() => RoundWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoundWhereUniqueInputSchema),z.lazy(() => RoundWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RoundUpdateWithWhereUniqueWithoutPhaseInputSchema),z.lazy(() => RoundUpdateWithWhereUniqueWithoutPhaseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RoundUpdateManyWithWhereWithoutPhaseInputSchema),z.lazy(() => RoundUpdateManyWithWhereWithoutPhaseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RoundScalarWhereInputSchema),z.lazy(() => RoundScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PhaseUncheckedUpdateOneWithoutPreviousPhaseNestedInputSchema: z.ZodType<Prisma.PhaseUncheckedUpdateOneWithoutPreviousPhaseNestedInput> = z.object({
  create: z.union([ z.lazy(() => PhaseCreateWithoutPreviousPhaseInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutPreviousPhaseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PhaseCreateOrConnectWithoutPreviousPhaseInputSchema).optional(),
  upsert: z.lazy(() => PhaseUpsertWithoutPreviousPhaseInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PhaseWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PhaseWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PhaseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PhaseUpdateToOneWithWhereWithoutPreviousPhaseInputSchema),z.lazy(() => PhaseUpdateWithoutPreviousPhaseInputSchema),z.lazy(() => PhaseUncheckedUpdateWithoutPreviousPhaseInputSchema) ]).optional(),
}).strict();

export const PhaseUncheckedUpdateOneWithoutNextPhaseNestedInputSchema: z.ZodType<Prisma.PhaseUncheckedUpdateOneWithoutNextPhaseNestedInput> = z.object({
  create: z.union([ z.lazy(() => PhaseCreateWithoutNextPhaseInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutNextPhaseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PhaseCreateOrConnectWithoutNextPhaseInputSchema).optional(),
  upsert: z.lazy(() => PhaseUpsertWithoutNextPhaseInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PhaseWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PhaseWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PhaseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PhaseUpdateToOneWithWhereWithoutNextPhaseInputSchema),z.lazy(() => PhaseUpdateWithoutNextPhaseInputSchema),z.lazy(() => PhaseUncheckedUpdateWithoutNextPhaseInputSchema) ]).optional(),
}).strict();

export const PhaseCreateNestedOneWithoutRoundsInputSchema: z.ZodType<Prisma.PhaseCreateNestedOneWithoutRoundsInput> = z.object({
  create: z.union([ z.lazy(() => PhaseCreateWithoutRoundsInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutRoundsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PhaseCreateOrConnectWithoutRoundsInputSchema).optional(),
  connect: z.lazy(() => PhaseWhereUniqueInputSchema).optional()
}).strict();

export const MatchRoundCreateNestedManyWithoutRoundInputSchema: z.ZodType<Prisma.MatchRoundCreateNestedManyWithoutRoundInput> = z.object({
  create: z.union([ z.lazy(() => MatchRoundCreateWithoutRoundInputSchema),z.lazy(() => MatchRoundCreateWithoutRoundInputSchema).array(),z.lazy(() => MatchRoundUncheckedCreateWithoutRoundInputSchema),z.lazy(() => MatchRoundUncheckedCreateWithoutRoundInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchRoundCreateOrConnectWithoutRoundInputSchema),z.lazy(() => MatchRoundCreateOrConnectWithoutRoundInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchRoundCreateManyRoundInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchRoundWhereUniqueInputSchema),z.lazy(() => MatchRoundWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RoundTeamCreateNestedManyWithoutRoundInputSchema: z.ZodType<Prisma.RoundTeamCreateNestedManyWithoutRoundInput> = z.object({
  create: z.union([ z.lazy(() => RoundTeamCreateWithoutRoundInputSchema),z.lazy(() => RoundTeamCreateWithoutRoundInputSchema).array(),z.lazy(() => RoundTeamUncheckedCreateWithoutRoundInputSchema),z.lazy(() => RoundTeamUncheckedCreateWithoutRoundInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoundTeamCreateOrConnectWithoutRoundInputSchema),z.lazy(() => RoundTeamCreateOrConnectWithoutRoundInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RoundTeamCreateManyRoundInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RoundTeamWhereUniqueInputSchema),z.lazy(() => RoundTeamWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MatchRoundUncheckedCreateNestedManyWithoutRoundInputSchema: z.ZodType<Prisma.MatchRoundUncheckedCreateNestedManyWithoutRoundInput> = z.object({
  create: z.union([ z.lazy(() => MatchRoundCreateWithoutRoundInputSchema),z.lazy(() => MatchRoundCreateWithoutRoundInputSchema).array(),z.lazy(() => MatchRoundUncheckedCreateWithoutRoundInputSchema),z.lazy(() => MatchRoundUncheckedCreateWithoutRoundInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchRoundCreateOrConnectWithoutRoundInputSchema),z.lazy(() => MatchRoundCreateOrConnectWithoutRoundInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchRoundCreateManyRoundInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchRoundWhereUniqueInputSchema),z.lazy(() => MatchRoundWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RoundTeamUncheckedCreateNestedManyWithoutRoundInputSchema: z.ZodType<Prisma.RoundTeamUncheckedCreateNestedManyWithoutRoundInput> = z.object({
  create: z.union([ z.lazy(() => RoundTeamCreateWithoutRoundInputSchema),z.lazy(() => RoundTeamCreateWithoutRoundInputSchema).array(),z.lazy(() => RoundTeamUncheckedCreateWithoutRoundInputSchema),z.lazy(() => RoundTeamUncheckedCreateWithoutRoundInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoundTeamCreateOrConnectWithoutRoundInputSchema),z.lazy(() => RoundTeamCreateOrConnectWithoutRoundInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RoundTeamCreateManyRoundInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RoundTeamWhereUniqueInputSchema),z.lazy(() => RoundTeamWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PhaseUpdateOneRequiredWithoutRoundsNestedInputSchema: z.ZodType<Prisma.PhaseUpdateOneRequiredWithoutRoundsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PhaseCreateWithoutRoundsInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutRoundsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PhaseCreateOrConnectWithoutRoundsInputSchema).optional(),
  upsert: z.lazy(() => PhaseUpsertWithoutRoundsInputSchema).optional(),
  connect: z.lazy(() => PhaseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PhaseUpdateToOneWithWhereWithoutRoundsInputSchema),z.lazy(() => PhaseUpdateWithoutRoundsInputSchema),z.lazy(() => PhaseUncheckedUpdateWithoutRoundsInputSchema) ]).optional(),
}).strict();

export const MatchRoundUpdateManyWithoutRoundNestedInputSchema: z.ZodType<Prisma.MatchRoundUpdateManyWithoutRoundNestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchRoundCreateWithoutRoundInputSchema),z.lazy(() => MatchRoundCreateWithoutRoundInputSchema).array(),z.lazy(() => MatchRoundUncheckedCreateWithoutRoundInputSchema),z.lazy(() => MatchRoundUncheckedCreateWithoutRoundInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchRoundCreateOrConnectWithoutRoundInputSchema),z.lazy(() => MatchRoundCreateOrConnectWithoutRoundInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchRoundUpsertWithWhereUniqueWithoutRoundInputSchema),z.lazy(() => MatchRoundUpsertWithWhereUniqueWithoutRoundInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchRoundCreateManyRoundInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchRoundWhereUniqueInputSchema),z.lazy(() => MatchRoundWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchRoundWhereUniqueInputSchema),z.lazy(() => MatchRoundWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchRoundWhereUniqueInputSchema),z.lazy(() => MatchRoundWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchRoundWhereUniqueInputSchema),z.lazy(() => MatchRoundWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchRoundUpdateWithWhereUniqueWithoutRoundInputSchema),z.lazy(() => MatchRoundUpdateWithWhereUniqueWithoutRoundInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchRoundUpdateManyWithWhereWithoutRoundInputSchema),z.lazy(() => MatchRoundUpdateManyWithWhereWithoutRoundInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchRoundScalarWhereInputSchema),z.lazy(() => MatchRoundScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RoundTeamUpdateManyWithoutRoundNestedInputSchema: z.ZodType<Prisma.RoundTeamUpdateManyWithoutRoundNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoundTeamCreateWithoutRoundInputSchema),z.lazy(() => RoundTeamCreateWithoutRoundInputSchema).array(),z.lazy(() => RoundTeamUncheckedCreateWithoutRoundInputSchema),z.lazy(() => RoundTeamUncheckedCreateWithoutRoundInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoundTeamCreateOrConnectWithoutRoundInputSchema),z.lazy(() => RoundTeamCreateOrConnectWithoutRoundInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RoundTeamUpsertWithWhereUniqueWithoutRoundInputSchema),z.lazy(() => RoundTeamUpsertWithWhereUniqueWithoutRoundInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RoundTeamCreateManyRoundInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RoundTeamWhereUniqueInputSchema),z.lazy(() => RoundTeamWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RoundTeamWhereUniqueInputSchema),z.lazy(() => RoundTeamWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RoundTeamWhereUniqueInputSchema),z.lazy(() => RoundTeamWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoundTeamWhereUniqueInputSchema),z.lazy(() => RoundTeamWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RoundTeamUpdateWithWhereUniqueWithoutRoundInputSchema),z.lazy(() => RoundTeamUpdateWithWhereUniqueWithoutRoundInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RoundTeamUpdateManyWithWhereWithoutRoundInputSchema),z.lazy(() => RoundTeamUpdateManyWithWhereWithoutRoundInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RoundTeamScalarWhereInputSchema),z.lazy(() => RoundTeamScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MatchRoundUncheckedUpdateManyWithoutRoundNestedInputSchema: z.ZodType<Prisma.MatchRoundUncheckedUpdateManyWithoutRoundNestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchRoundCreateWithoutRoundInputSchema),z.lazy(() => MatchRoundCreateWithoutRoundInputSchema).array(),z.lazy(() => MatchRoundUncheckedCreateWithoutRoundInputSchema),z.lazy(() => MatchRoundUncheckedCreateWithoutRoundInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchRoundCreateOrConnectWithoutRoundInputSchema),z.lazy(() => MatchRoundCreateOrConnectWithoutRoundInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchRoundUpsertWithWhereUniqueWithoutRoundInputSchema),z.lazy(() => MatchRoundUpsertWithWhereUniqueWithoutRoundInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchRoundCreateManyRoundInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchRoundWhereUniqueInputSchema),z.lazy(() => MatchRoundWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchRoundWhereUniqueInputSchema),z.lazy(() => MatchRoundWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchRoundWhereUniqueInputSchema),z.lazy(() => MatchRoundWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchRoundWhereUniqueInputSchema),z.lazy(() => MatchRoundWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchRoundUpdateWithWhereUniqueWithoutRoundInputSchema),z.lazy(() => MatchRoundUpdateWithWhereUniqueWithoutRoundInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchRoundUpdateManyWithWhereWithoutRoundInputSchema),z.lazy(() => MatchRoundUpdateManyWithWhereWithoutRoundInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchRoundScalarWhereInputSchema),z.lazy(() => MatchRoundScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RoundTeamUncheckedUpdateManyWithoutRoundNestedInputSchema: z.ZodType<Prisma.RoundTeamUncheckedUpdateManyWithoutRoundNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoundTeamCreateWithoutRoundInputSchema),z.lazy(() => RoundTeamCreateWithoutRoundInputSchema).array(),z.lazy(() => RoundTeamUncheckedCreateWithoutRoundInputSchema),z.lazy(() => RoundTeamUncheckedCreateWithoutRoundInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoundTeamCreateOrConnectWithoutRoundInputSchema),z.lazy(() => RoundTeamCreateOrConnectWithoutRoundInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RoundTeamUpsertWithWhereUniqueWithoutRoundInputSchema),z.lazy(() => RoundTeamUpsertWithWhereUniqueWithoutRoundInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RoundTeamCreateManyRoundInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RoundTeamWhereUniqueInputSchema),z.lazy(() => RoundTeamWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RoundTeamWhereUniqueInputSchema),z.lazy(() => RoundTeamWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RoundTeamWhereUniqueInputSchema),z.lazy(() => RoundTeamWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoundTeamWhereUniqueInputSchema),z.lazy(() => RoundTeamWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RoundTeamUpdateWithWhereUniqueWithoutRoundInputSchema),z.lazy(() => RoundTeamUpdateWithWhereUniqueWithoutRoundInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RoundTeamUpdateManyWithWhereWithoutRoundInputSchema),z.lazy(() => RoundTeamUpdateManyWithWhereWithoutRoundInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RoundTeamScalarWhereInputSchema),z.lazy(() => RoundTeamScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RoundCreateNestedOneWithoutMatchesInputSchema: z.ZodType<Prisma.RoundCreateNestedOneWithoutMatchesInput> = z.object({
  create: z.union([ z.lazy(() => RoundCreateWithoutMatchesInputSchema),z.lazy(() => RoundUncheckedCreateWithoutMatchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoundCreateOrConnectWithoutMatchesInputSchema).optional(),
  connect: z.lazy(() => RoundWhereUniqueInputSchema).optional()
}).strict();

export const MatchCreateNestedOneWithoutRoundInputSchema: z.ZodType<Prisma.MatchCreateNestedOneWithoutRoundInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutRoundInputSchema),z.lazy(() => MatchUncheckedCreateWithoutRoundInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MatchCreateOrConnectWithoutRoundInputSchema).optional(),
  connect: z.lazy(() => MatchWhereUniqueInputSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const RoundUpdateOneRequiredWithoutMatchesNestedInputSchema: z.ZodType<Prisma.RoundUpdateOneRequiredWithoutMatchesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoundCreateWithoutMatchesInputSchema),z.lazy(() => RoundUncheckedCreateWithoutMatchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoundCreateOrConnectWithoutMatchesInputSchema).optional(),
  upsert: z.lazy(() => RoundUpsertWithoutMatchesInputSchema).optional(),
  connect: z.lazy(() => RoundWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RoundUpdateToOneWithWhereWithoutMatchesInputSchema),z.lazy(() => RoundUpdateWithoutMatchesInputSchema),z.lazy(() => RoundUncheckedUpdateWithoutMatchesInputSchema) ]).optional(),
}).strict();

export const MatchUpdateOneRequiredWithoutRoundNestedInputSchema: z.ZodType<Prisma.MatchUpdateOneRequiredWithoutRoundNestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutRoundInputSchema),z.lazy(() => MatchUncheckedCreateWithoutRoundInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MatchCreateOrConnectWithoutRoundInputSchema).optional(),
  upsert: z.lazy(() => MatchUpsertWithoutRoundInputSchema).optional(),
  connect: z.lazy(() => MatchWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MatchUpdateToOneWithWhereWithoutRoundInputSchema),z.lazy(() => MatchUpdateWithoutRoundInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutRoundInputSchema) ]).optional(),
}).strict();

export const TeamCreateNestedOneWithoutRoundTeamInputSchema: z.ZodType<Prisma.TeamCreateNestedOneWithoutRoundTeamInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutRoundTeamInputSchema),z.lazy(() => TeamUncheckedCreateWithoutRoundTeamInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutRoundTeamInputSchema).optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional()
}).strict();

export const RoundCreateNestedOneWithoutRoundTeamInputSchema: z.ZodType<Prisma.RoundCreateNestedOneWithoutRoundTeamInput> = z.object({
  create: z.union([ z.lazy(() => RoundCreateWithoutRoundTeamInputSchema),z.lazy(() => RoundUncheckedCreateWithoutRoundTeamInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoundCreateOrConnectWithoutRoundTeamInputSchema).optional(),
  connect: z.lazy(() => RoundWhereUniqueInputSchema).optional()
}).strict();

export const TeamUpdateOneRequiredWithoutRoundTeamNestedInputSchema: z.ZodType<Prisma.TeamUpdateOneRequiredWithoutRoundTeamNestedInput> = z.object({
  create: z.union([ z.lazy(() => TeamCreateWithoutRoundTeamInputSchema),z.lazy(() => TeamUncheckedCreateWithoutRoundTeamInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TeamCreateOrConnectWithoutRoundTeamInputSchema).optional(),
  upsert: z.lazy(() => TeamUpsertWithoutRoundTeamInputSchema).optional(),
  connect: z.lazy(() => TeamWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TeamUpdateToOneWithWhereWithoutRoundTeamInputSchema),z.lazy(() => TeamUpdateWithoutRoundTeamInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutRoundTeamInputSchema) ]).optional(),
}).strict();

export const RoundUpdateOneRequiredWithoutRoundTeamNestedInputSchema: z.ZodType<Prisma.RoundUpdateOneRequiredWithoutRoundTeamNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoundCreateWithoutRoundTeamInputSchema),z.lazy(() => RoundUncheckedCreateWithoutRoundTeamInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoundCreateOrConnectWithoutRoundTeamInputSchema).optional(),
  upsert: z.lazy(() => RoundUpsertWithoutRoundTeamInputSchema).optional(),
  connect: z.lazy(() => RoundWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RoundUpdateToOneWithWhereWithoutRoundTeamInputSchema),z.lazy(() => RoundUpdateWithoutRoundTeamInputSchema),z.lazy(() => RoundUncheckedUpdateWithoutRoundTeamInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumMatchStatusFilterSchema: z.ZodType<Prisma.NestedEnumMatchStatusFilter> = z.object({
  equals: z.lazy(() => MatchStatusSchema).optional(),
  in: z.lazy(() => MatchStatusSchema).array().optional(),
  notIn: z.lazy(() => MatchStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => MatchStatusSchema),z.lazy(() => NestedEnumMatchStatusFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedEnumMatchStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumMatchStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MatchStatusSchema).optional(),
  in: z.lazy(() => MatchStatusSchema).array().optional(),
  notIn: z.lazy(() => MatchStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => MatchStatusSchema),z.lazy(() => NestedEnumMatchStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMatchStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMatchStatusFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumPhaseTypeFilterSchema: z.ZodType<Prisma.NestedEnumPhaseTypeFilter> = z.object({
  equals: z.lazy(() => PhaseTypeSchema).optional(),
  in: z.lazy(() => PhaseTypeSchema).array().optional(),
  notIn: z.lazy(() => PhaseTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PhaseTypeSchema),z.lazy(() => NestedEnumPhaseTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumPhaseTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPhaseTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PhaseTypeSchema).optional(),
  in: z.lazy(() => PhaseTypeSchema).array().optional(),
  notIn: z.lazy(() => PhaseTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => PhaseTypeSchema),z.lazy(() => NestedEnumPhaseTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPhaseTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPhaseTypeFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const TeamCreateWithoutMatchesTeamAInputSchema: z.ZodType<Prisma.TeamCreateWithoutMatchesTeamAInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  players: z.lazy(() => PlayerCreateNestedManyWithoutTeamInputSchema).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentCreateNestedManyWithoutTeamInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchCreateNestedManyWithoutTeamBInputSchema).optional(),
  wonMatches: z.lazy(() => MatchCreateNestedManyWithoutWinnerInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamCreateNestedManyWithoutTeamInputSchema).optional()
}).strict();

export const TeamUncheckedCreateWithoutMatchesTeamAInputSchema: z.ZodType<Prisma.TeamUncheckedCreateWithoutMatchesTeamAInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  players: z.lazy(() => PlayerUncheckedCreateNestedManyWithoutTeamInputSchema).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentUncheckedCreateNestedManyWithoutTeamInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeamBInputSchema).optional(),
  wonMatches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutWinnerInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUncheckedCreateNestedManyWithoutTeamInputSchema).optional()
}).strict();

export const TeamCreateOrConnectWithoutMatchesTeamAInputSchema: z.ZodType<Prisma.TeamCreateOrConnectWithoutMatchesTeamAInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TeamCreateWithoutMatchesTeamAInputSchema),z.lazy(() => TeamUncheckedCreateWithoutMatchesTeamAInputSchema) ]),
}).strict();

export const TeamCreateWithoutMatchesTeamBInputSchema: z.ZodType<Prisma.TeamCreateWithoutMatchesTeamBInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  players: z.lazy(() => PlayerCreateNestedManyWithoutTeamInputSchema).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentCreateNestedManyWithoutTeamInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchCreateNestedManyWithoutTeamAInputSchema).optional(),
  wonMatches: z.lazy(() => MatchCreateNestedManyWithoutWinnerInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamCreateNestedManyWithoutTeamInputSchema).optional()
}).strict();

export const TeamUncheckedCreateWithoutMatchesTeamBInputSchema: z.ZodType<Prisma.TeamUncheckedCreateWithoutMatchesTeamBInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  players: z.lazy(() => PlayerUncheckedCreateNestedManyWithoutTeamInputSchema).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentUncheckedCreateNestedManyWithoutTeamInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeamAInputSchema).optional(),
  wonMatches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutWinnerInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUncheckedCreateNestedManyWithoutTeamInputSchema).optional()
}).strict();

export const TeamCreateOrConnectWithoutMatchesTeamBInputSchema: z.ZodType<Prisma.TeamCreateOrConnectWithoutMatchesTeamBInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TeamCreateWithoutMatchesTeamBInputSchema),z.lazy(() => TeamUncheckedCreateWithoutMatchesTeamBInputSchema) ]),
}).strict();

export const TeamCreateWithoutWonMatchesInputSchema: z.ZodType<Prisma.TeamCreateWithoutWonMatchesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  players: z.lazy(() => PlayerCreateNestedManyWithoutTeamInputSchema).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentCreateNestedManyWithoutTeamInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchCreateNestedManyWithoutTeamAInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchCreateNestedManyWithoutTeamBInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamCreateNestedManyWithoutTeamInputSchema).optional()
}).strict();

export const TeamUncheckedCreateWithoutWonMatchesInputSchema: z.ZodType<Prisma.TeamUncheckedCreateWithoutWonMatchesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  players: z.lazy(() => PlayerUncheckedCreateNestedManyWithoutTeamInputSchema).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentUncheckedCreateNestedManyWithoutTeamInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeamAInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeamBInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUncheckedCreateNestedManyWithoutTeamInputSchema).optional()
}).strict();

export const TeamCreateOrConnectWithoutWonMatchesInputSchema: z.ZodType<Prisma.TeamCreateOrConnectWithoutWonMatchesInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TeamCreateWithoutWonMatchesInputSchema),z.lazy(() => TeamUncheckedCreateWithoutWonMatchesInputSchema) ]),
}).strict();

export const MatchRoundCreateWithoutMatchInputSchema: z.ZodType<Prisma.MatchRoundCreateWithoutMatchInput> = z.object({
  id: z.string().cuid().optional(),
  numRoundMatch: z.number().int(),
  round: z.lazy(() => RoundCreateNestedOneWithoutMatchesInputSchema)
}).strict();

export const MatchRoundUncheckedCreateWithoutMatchInputSchema: z.ZodType<Prisma.MatchRoundUncheckedCreateWithoutMatchInput> = z.object({
  id: z.string().cuid().optional(),
  numRoundMatch: z.number().int(),
  roundId: z.string()
}).strict();

export const MatchRoundCreateOrConnectWithoutMatchInputSchema: z.ZodType<Prisma.MatchRoundCreateOrConnectWithoutMatchInput> = z.object({
  where: z.lazy(() => MatchRoundWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MatchRoundCreateWithoutMatchInputSchema),z.lazy(() => MatchRoundUncheckedCreateWithoutMatchInputSchema) ]),
}).strict();

export const TeamUpsertWithoutMatchesTeamAInputSchema: z.ZodType<Prisma.TeamUpsertWithoutMatchesTeamAInput> = z.object({
  update: z.union([ z.lazy(() => TeamUpdateWithoutMatchesTeamAInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutMatchesTeamAInputSchema) ]),
  create: z.union([ z.lazy(() => TeamCreateWithoutMatchesTeamAInputSchema),z.lazy(() => TeamUncheckedCreateWithoutMatchesTeamAInputSchema) ]),
  where: z.lazy(() => TeamWhereInputSchema).optional()
}).strict();

export const TeamUpdateToOneWithWhereWithoutMatchesTeamAInputSchema: z.ZodType<Prisma.TeamUpdateToOneWithWhereWithoutMatchesTeamAInput> = z.object({
  where: z.lazy(() => TeamWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TeamUpdateWithoutMatchesTeamAInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutMatchesTeamAInputSchema) ]),
}).strict();

export const TeamUpdateWithoutMatchesTeamAInputSchema: z.ZodType<Prisma.TeamUpdateWithoutMatchesTeamAInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => PlayerUpdateManyWithoutTeamNestedInputSchema).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentUpdateManyWithoutTeamNestedInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchUpdateManyWithoutTeamBNestedInputSchema).optional(),
  wonMatches: z.lazy(() => MatchUpdateManyWithoutWinnerNestedInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUpdateManyWithoutTeamNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateWithoutMatchesTeamAInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateWithoutMatchesTeamAInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => PlayerUncheckedUpdateManyWithoutTeamNestedInputSchema).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentUncheckedUpdateManyWithoutTeamNestedInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchUncheckedUpdateManyWithoutTeamBNestedInputSchema).optional(),
  wonMatches: z.lazy(() => MatchUncheckedUpdateManyWithoutWinnerNestedInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUncheckedUpdateManyWithoutTeamNestedInputSchema).optional()
}).strict();

export const TeamUpsertWithoutMatchesTeamBInputSchema: z.ZodType<Prisma.TeamUpsertWithoutMatchesTeamBInput> = z.object({
  update: z.union([ z.lazy(() => TeamUpdateWithoutMatchesTeamBInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutMatchesTeamBInputSchema) ]),
  create: z.union([ z.lazy(() => TeamCreateWithoutMatchesTeamBInputSchema),z.lazy(() => TeamUncheckedCreateWithoutMatchesTeamBInputSchema) ]),
  where: z.lazy(() => TeamWhereInputSchema).optional()
}).strict();

export const TeamUpdateToOneWithWhereWithoutMatchesTeamBInputSchema: z.ZodType<Prisma.TeamUpdateToOneWithWhereWithoutMatchesTeamBInput> = z.object({
  where: z.lazy(() => TeamWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TeamUpdateWithoutMatchesTeamBInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutMatchesTeamBInputSchema) ]),
}).strict();

export const TeamUpdateWithoutMatchesTeamBInputSchema: z.ZodType<Prisma.TeamUpdateWithoutMatchesTeamBInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => PlayerUpdateManyWithoutTeamNestedInputSchema).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentUpdateManyWithoutTeamNestedInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchUpdateManyWithoutTeamANestedInputSchema).optional(),
  wonMatches: z.lazy(() => MatchUpdateManyWithoutWinnerNestedInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUpdateManyWithoutTeamNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateWithoutMatchesTeamBInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateWithoutMatchesTeamBInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => PlayerUncheckedUpdateManyWithoutTeamNestedInputSchema).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentUncheckedUpdateManyWithoutTeamNestedInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchUncheckedUpdateManyWithoutTeamANestedInputSchema).optional(),
  wonMatches: z.lazy(() => MatchUncheckedUpdateManyWithoutWinnerNestedInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUncheckedUpdateManyWithoutTeamNestedInputSchema).optional()
}).strict();

export const TeamUpsertWithoutWonMatchesInputSchema: z.ZodType<Prisma.TeamUpsertWithoutWonMatchesInput> = z.object({
  update: z.union([ z.lazy(() => TeamUpdateWithoutWonMatchesInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutWonMatchesInputSchema) ]),
  create: z.union([ z.lazy(() => TeamCreateWithoutWonMatchesInputSchema),z.lazy(() => TeamUncheckedCreateWithoutWonMatchesInputSchema) ]),
  where: z.lazy(() => TeamWhereInputSchema).optional()
}).strict();

export const TeamUpdateToOneWithWhereWithoutWonMatchesInputSchema: z.ZodType<Prisma.TeamUpdateToOneWithWhereWithoutWonMatchesInput> = z.object({
  where: z.lazy(() => TeamWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TeamUpdateWithoutWonMatchesInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutWonMatchesInputSchema) ]),
}).strict();

export const TeamUpdateWithoutWonMatchesInputSchema: z.ZodType<Prisma.TeamUpdateWithoutWonMatchesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => PlayerUpdateManyWithoutTeamNestedInputSchema).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentUpdateManyWithoutTeamNestedInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchUpdateManyWithoutTeamANestedInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchUpdateManyWithoutTeamBNestedInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUpdateManyWithoutTeamNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateWithoutWonMatchesInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateWithoutWonMatchesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => PlayerUncheckedUpdateManyWithoutTeamNestedInputSchema).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentUncheckedUpdateManyWithoutTeamNestedInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchUncheckedUpdateManyWithoutTeamANestedInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchUncheckedUpdateManyWithoutTeamBNestedInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUncheckedUpdateManyWithoutTeamNestedInputSchema).optional()
}).strict();

export const MatchRoundUpsertWithoutMatchInputSchema: z.ZodType<Prisma.MatchRoundUpsertWithoutMatchInput> = z.object({
  update: z.union([ z.lazy(() => MatchRoundUpdateWithoutMatchInputSchema),z.lazy(() => MatchRoundUncheckedUpdateWithoutMatchInputSchema) ]),
  create: z.union([ z.lazy(() => MatchRoundCreateWithoutMatchInputSchema),z.lazy(() => MatchRoundUncheckedCreateWithoutMatchInputSchema) ]),
  where: z.lazy(() => MatchRoundWhereInputSchema).optional()
}).strict();

export const MatchRoundUpdateToOneWithWhereWithoutMatchInputSchema: z.ZodType<Prisma.MatchRoundUpdateToOneWithWhereWithoutMatchInput> = z.object({
  where: z.lazy(() => MatchRoundWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MatchRoundUpdateWithoutMatchInputSchema),z.lazy(() => MatchRoundUncheckedUpdateWithoutMatchInputSchema) ]),
}).strict();

export const MatchRoundUpdateWithoutMatchInputSchema: z.ZodType<Prisma.MatchRoundUpdateWithoutMatchInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  numRoundMatch: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  round: z.lazy(() => RoundUpdateOneRequiredWithoutMatchesNestedInputSchema).optional()
}).strict();

export const MatchRoundUncheckedUpdateWithoutMatchInputSchema: z.ZodType<Prisma.MatchRoundUncheckedUpdateWithoutMatchInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  numRoundMatch: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  roundId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlayerCreateWithoutTeamInputSchema: z.ZodType<Prisma.PlayerCreateWithoutTeamInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PlayerUncheckedCreateWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUncheckedCreateWithoutTeamInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PlayerCreateOrConnectWithoutTeamInputSchema: z.ZodType<Prisma.PlayerCreateOrConnectWithoutTeamInput> = z.object({
  where: z.lazy(() => PlayerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PlayerCreateWithoutTeamInputSchema),z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema) ]),
}).strict();

export const PlayerCreateManyTeamInputEnvelopeSchema: z.ZodType<Prisma.PlayerCreateManyTeamInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PlayerCreateManyTeamInputSchema),z.lazy(() => PlayerCreateManyTeamInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TeamTournamentCreateWithoutTeamInputSchema: z.ZodType<Prisma.TeamTournamentCreateWithoutTeamInput> = z.object({
  id: z.string().cuid().optional(),
  seed: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tournament: z.lazy(() => TournamentCreateNestedOneWithoutTeamsInputSchema)
}).strict();

export const TeamTournamentUncheckedCreateWithoutTeamInputSchema: z.ZodType<Prisma.TeamTournamentUncheckedCreateWithoutTeamInput> = z.object({
  id: z.string().cuid().optional(),
  tournamentId: z.string(),
  seed: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TeamTournamentCreateOrConnectWithoutTeamInputSchema: z.ZodType<Prisma.TeamTournamentCreateOrConnectWithoutTeamInput> = z.object({
  where: z.lazy(() => TeamTournamentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TeamTournamentCreateWithoutTeamInputSchema),z.lazy(() => TeamTournamentUncheckedCreateWithoutTeamInputSchema) ]),
}).strict();

export const TeamTournamentCreateManyTeamInputEnvelopeSchema: z.ZodType<Prisma.TeamTournamentCreateManyTeamInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TeamTournamentCreateManyTeamInputSchema),z.lazy(() => TeamTournamentCreateManyTeamInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MatchCreateWithoutTeamAInputSchema: z.ZodType<Prisma.MatchCreateWithoutTeamAInput> = z.object({
  id: z.string().cuid().optional(),
  matchNumber: z.number().int().optional().nullable(),
  scoreTeamA: z.number().int().optional().nullable(),
  scoreTeamB: z.number().int().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  location: z.string().optional().nullable(),
  status: z.lazy(() => MatchStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  teamB: z.lazy(() => TeamCreateNestedOneWithoutMatchesTeamBInputSchema).optional(),
  winner: z.lazy(() => TeamCreateNestedOneWithoutWonMatchesInputSchema).optional(),
  round: z.lazy(() => MatchRoundCreateNestedOneWithoutMatchInputSchema).optional()
}).strict();

export const MatchUncheckedCreateWithoutTeamAInputSchema: z.ZodType<Prisma.MatchUncheckedCreateWithoutTeamAInput> = z.object({
  id: z.string().cuid().optional(),
  matchNumber: z.number().int().optional().nullable(),
  teamBId: z.string().optional().nullable(),
  scoreTeamA: z.number().int().optional().nullable(),
  scoreTeamB: z.number().int().optional().nullable(),
  winnerId: z.string().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  location: z.string().optional().nullable(),
  status: z.lazy(() => MatchStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  round: z.lazy(() => MatchRoundUncheckedCreateNestedOneWithoutMatchInputSchema).optional()
}).strict();

export const MatchCreateOrConnectWithoutTeamAInputSchema: z.ZodType<Prisma.MatchCreateOrConnectWithoutTeamAInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MatchCreateWithoutTeamAInputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeamAInputSchema) ]),
}).strict();

export const MatchCreateManyTeamAInputEnvelopeSchema: z.ZodType<Prisma.MatchCreateManyTeamAInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MatchCreateManyTeamAInputSchema),z.lazy(() => MatchCreateManyTeamAInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MatchCreateWithoutTeamBInputSchema: z.ZodType<Prisma.MatchCreateWithoutTeamBInput> = z.object({
  id: z.string().cuid().optional(),
  matchNumber: z.number().int().optional().nullable(),
  scoreTeamA: z.number().int().optional().nullable(),
  scoreTeamB: z.number().int().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  location: z.string().optional().nullable(),
  status: z.lazy(() => MatchStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  teamA: z.lazy(() => TeamCreateNestedOneWithoutMatchesTeamAInputSchema).optional(),
  winner: z.lazy(() => TeamCreateNestedOneWithoutWonMatchesInputSchema).optional(),
  round: z.lazy(() => MatchRoundCreateNestedOneWithoutMatchInputSchema).optional()
}).strict();

export const MatchUncheckedCreateWithoutTeamBInputSchema: z.ZodType<Prisma.MatchUncheckedCreateWithoutTeamBInput> = z.object({
  id: z.string().cuid().optional(),
  matchNumber: z.number().int().optional().nullable(),
  teamAId: z.string().optional().nullable(),
  scoreTeamA: z.number().int().optional().nullable(),
  scoreTeamB: z.number().int().optional().nullable(),
  winnerId: z.string().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  location: z.string().optional().nullable(),
  status: z.lazy(() => MatchStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  round: z.lazy(() => MatchRoundUncheckedCreateNestedOneWithoutMatchInputSchema).optional()
}).strict();

export const MatchCreateOrConnectWithoutTeamBInputSchema: z.ZodType<Prisma.MatchCreateOrConnectWithoutTeamBInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MatchCreateWithoutTeamBInputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeamBInputSchema) ]),
}).strict();

export const MatchCreateManyTeamBInputEnvelopeSchema: z.ZodType<Prisma.MatchCreateManyTeamBInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MatchCreateManyTeamBInputSchema),z.lazy(() => MatchCreateManyTeamBInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MatchCreateWithoutWinnerInputSchema: z.ZodType<Prisma.MatchCreateWithoutWinnerInput> = z.object({
  id: z.string().cuid().optional(),
  matchNumber: z.number().int().optional().nullable(),
  scoreTeamA: z.number().int().optional().nullable(),
  scoreTeamB: z.number().int().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  location: z.string().optional().nullable(),
  status: z.lazy(() => MatchStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  teamA: z.lazy(() => TeamCreateNestedOneWithoutMatchesTeamAInputSchema).optional(),
  teamB: z.lazy(() => TeamCreateNestedOneWithoutMatchesTeamBInputSchema).optional(),
  round: z.lazy(() => MatchRoundCreateNestedOneWithoutMatchInputSchema).optional()
}).strict();

export const MatchUncheckedCreateWithoutWinnerInputSchema: z.ZodType<Prisma.MatchUncheckedCreateWithoutWinnerInput> = z.object({
  id: z.string().cuid().optional(),
  matchNumber: z.number().int().optional().nullable(),
  teamAId: z.string().optional().nullable(),
  teamBId: z.string().optional().nullable(),
  scoreTeamA: z.number().int().optional().nullable(),
  scoreTeamB: z.number().int().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  location: z.string().optional().nullable(),
  status: z.lazy(() => MatchStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  round: z.lazy(() => MatchRoundUncheckedCreateNestedOneWithoutMatchInputSchema).optional()
}).strict();

export const MatchCreateOrConnectWithoutWinnerInputSchema: z.ZodType<Prisma.MatchCreateOrConnectWithoutWinnerInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MatchCreateWithoutWinnerInputSchema),z.lazy(() => MatchUncheckedCreateWithoutWinnerInputSchema) ]),
}).strict();

export const MatchCreateManyWinnerInputEnvelopeSchema: z.ZodType<Prisma.MatchCreateManyWinnerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MatchCreateManyWinnerInputSchema),z.lazy(() => MatchCreateManyWinnerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RoundTeamCreateWithoutTeamInputSchema: z.ZodType<Prisma.RoundTeamCreateWithoutTeamInput> = z.object({
  id: z.string().cuid().optional(),
  round: z.lazy(() => RoundCreateNestedOneWithoutRoundTeamInputSchema)
}).strict();

export const RoundTeamUncheckedCreateWithoutTeamInputSchema: z.ZodType<Prisma.RoundTeamUncheckedCreateWithoutTeamInput> = z.object({
  id: z.string().cuid().optional(),
  roundId: z.string()
}).strict();

export const RoundTeamCreateOrConnectWithoutTeamInputSchema: z.ZodType<Prisma.RoundTeamCreateOrConnectWithoutTeamInput> = z.object({
  where: z.lazy(() => RoundTeamWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoundTeamCreateWithoutTeamInputSchema),z.lazy(() => RoundTeamUncheckedCreateWithoutTeamInputSchema) ]),
}).strict();

export const RoundTeamCreateManyTeamInputEnvelopeSchema: z.ZodType<Prisma.RoundTeamCreateManyTeamInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RoundTeamCreateManyTeamInputSchema),z.lazy(() => RoundTeamCreateManyTeamInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PlayerUpsertWithWhereUniqueWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUpsertWithWhereUniqueWithoutTeamInput> = z.object({
  where: z.lazy(() => PlayerWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PlayerUpdateWithoutTeamInputSchema),z.lazy(() => PlayerUncheckedUpdateWithoutTeamInputSchema) ]),
  create: z.union([ z.lazy(() => PlayerCreateWithoutTeamInputSchema),z.lazy(() => PlayerUncheckedCreateWithoutTeamInputSchema) ]),
}).strict();

export const PlayerUpdateWithWhereUniqueWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUpdateWithWhereUniqueWithoutTeamInput> = z.object({
  where: z.lazy(() => PlayerWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PlayerUpdateWithoutTeamInputSchema),z.lazy(() => PlayerUncheckedUpdateWithoutTeamInputSchema) ]),
}).strict();

export const PlayerUpdateManyWithWhereWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUpdateManyWithWhereWithoutTeamInput> = z.object({
  where: z.lazy(() => PlayerScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PlayerUpdateManyMutationInputSchema),z.lazy(() => PlayerUncheckedUpdateManyWithoutTeamInputSchema) ]),
}).strict();

export const PlayerScalarWhereInputSchema: z.ZodType<Prisma.PlayerScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PlayerScalarWhereInputSchema),z.lazy(() => PlayerScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlayerScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlayerScalarWhereInputSchema),z.lazy(() => PlayerScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  teamId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TeamTournamentUpsertWithWhereUniqueWithoutTeamInputSchema: z.ZodType<Prisma.TeamTournamentUpsertWithWhereUniqueWithoutTeamInput> = z.object({
  where: z.lazy(() => TeamTournamentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TeamTournamentUpdateWithoutTeamInputSchema),z.lazy(() => TeamTournamentUncheckedUpdateWithoutTeamInputSchema) ]),
  create: z.union([ z.lazy(() => TeamTournamentCreateWithoutTeamInputSchema),z.lazy(() => TeamTournamentUncheckedCreateWithoutTeamInputSchema) ]),
}).strict();

export const TeamTournamentUpdateWithWhereUniqueWithoutTeamInputSchema: z.ZodType<Prisma.TeamTournamentUpdateWithWhereUniqueWithoutTeamInput> = z.object({
  where: z.lazy(() => TeamTournamentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TeamTournamentUpdateWithoutTeamInputSchema),z.lazy(() => TeamTournamentUncheckedUpdateWithoutTeamInputSchema) ]),
}).strict();

export const TeamTournamentUpdateManyWithWhereWithoutTeamInputSchema: z.ZodType<Prisma.TeamTournamentUpdateManyWithWhereWithoutTeamInput> = z.object({
  where: z.lazy(() => TeamTournamentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TeamTournamentUpdateManyMutationInputSchema),z.lazy(() => TeamTournamentUncheckedUpdateManyWithoutTeamInputSchema) ]),
}).strict();

export const TeamTournamentScalarWhereInputSchema: z.ZodType<Prisma.TeamTournamentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TeamTournamentScalarWhereInputSchema),z.lazy(() => TeamTournamentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TeamTournamentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TeamTournamentScalarWhereInputSchema),z.lazy(() => TeamTournamentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tournamentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  teamId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  seed: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const MatchUpsertWithWhereUniqueWithoutTeamAInputSchema: z.ZodType<Prisma.MatchUpsertWithWhereUniqueWithoutTeamAInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MatchUpdateWithoutTeamAInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutTeamAInputSchema) ]),
  create: z.union([ z.lazy(() => MatchCreateWithoutTeamAInputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeamAInputSchema) ]),
}).strict();

export const MatchUpdateWithWhereUniqueWithoutTeamAInputSchema: z.ZodType<Prisma.MatchUpdateWithWhereUniqueWithoutTeamAInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MatchUpdateWithoutTeamAInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutTeamAInputSchema) ]),
}).strict();

export const MatchUpdateManyWithWhereWithoutTeamAInputSchema: z.ZodType<Prisma.MatchUpdateManyWithWhereWithoutTeamAInput> = z.object({
  where: z.lazy(() => MatchScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MatchUpdateManyMutationInputSchema),z.lazy(() => MatchUncheckedUpdateManyWithoutTeamAInputSchema) ]),
}).strict();

export const MatchScalarWhereInputSchema: z.ZodType<Prisma.MatchScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MatchScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  matchNumber: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  teamAId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  teamBId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scoreTeamA: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  scoreTeamB: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  winnerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  startTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  endTime: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumMatchStatusFilterSchema),z.lazy(() => MatchStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const MatchUpsertWithWhereUniqueWithoutTeamBInputSchema: z.ZodType<Prisma.MatchUpsertWithWhereUniqueWithoutTeamBInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MatchUpdateWithoutTeamBInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutTeamBInputSchema) ]),
  create: z.union([ z.lazy(() => MatchCreateWithoutTeamBInputSchema),z.lazy(() => MatchUncheckedCreateWithoutTeamBInputSchema) ]),
}).strict();

export const MatchUpdateWithWhereUniqueWithoutTeamBInputSchema: z.ZodType<Prisma.MatchUpdateWithWhereUniqueWithoutTeamBInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MatchUpdateWithoutTeamBInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutTeamBInputSchema) ]),
}).strict();

export const MatchUpdateManyWithWhereWithoutTeamBInputSchema: z.ZodType<Prisma.MatchUpdateManyWithWhereWithoutTeamBInput> = z.object({
  where: z.lazy(() => MatchScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MatchUpdateManyMutationInputSchema),z.lazy(() => MatchUncheckedUpdateManyWithoutTeamBInputSchema) ]),
}).strict();

export const MatchUpsertWithWhereUniqueWithoutWinnerInputSchema: z.ZodType<Prisma.MatchUpsertWithWhereUniqueWithoutWinnerInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MatchUpdateWithoutWinnerInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutWinnerInputSchema) ]),
  create: z.union([ z.lazy(() => MatchCreateWithoutWinnerInputSchema),z.lazy(() => MatchUncheckedCreateWithoutWinnerInputSchema) ]),
}).strict();

export const MatchUpdateWithWhereUniqueWithoutWinnerInputSchema: z.ZodType<Prisma.MatchUpdateWithWhereUniqueWithoutWinnerInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MatchUpdateWithoutWinnerInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutWinnerInputSchema) ]),
}).strict();

export const MatchUpdateManyWithWhereWithoutWinnerInputSchema: z.ZodType<Prisma.MatchUpdateManyWithWhereWithoutWinnerInput> = z.object({
  where: z.lazy(() => MatchScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MatchUpdateManyMutationInputSchema),z.lazy(() => MatchUncheckedUpdateManyWithoutWinnerInputSchema) ]),
}).strict();

export const RoundTeamUpsertWithWhereUniqueWithoutTeamInputSchema: z.ZodType<Prisma.RoundTeamUpsertWithWhereUniqueWithoutTeamInput> = z.object({
  where: z.lazy(() => RoundTeamWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RoundTeamUpdateWithoutTeamInputSchema),z.lazy(() => RoundTeamUncheckedUpdateWithoutTeamInputSchema) ]),
  create: z.union([ z.lazy(() => RoundTeamCreateWithoutTeamInputSchema),z.lazy(() => RoundTeamUncheckedCreateWithoutTeamInputSchema) ]),
}).strict();

export const RoundTeamUpdateWithWhereUniqueWithoutTeamInputSchema: z.ZodType<Prisma.RoundTeamUpdateWithWhereUniqueWithoutTeamInput> = z.object({
  where: z.lazy(() => RoundTeamWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RoundTeamUpdateWithoutTeamInputSchema),z.lazy(() => RoundTeamUncheckedUpdateWithoutTeamInputSchema) ]),
}).strict();

export const RoundTeamUpdateManyWithWhereWithoutTeamInputSchema: z.ZodType<Prisma.RoundTeamUpdateManyWithWhereWithoutTeamInput> = z.object({
  where: z.lazy(() => RoundTeamScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RoundTeamUpdateManyMutationInputSchema),z.lazy(() => RoundTeamUncheckedUpdateManyWithoutTeamInputSchema) ]),
}).strict();

export const RoundTeamScalarWhereInputSchema: z.ZodType<Prisma.RoundTeamScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RoundTeamScalarWhereInputSchema),z.lazy(() => RoundTeamScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoundTeamScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoundTeamScalarWhereInputSchema),z.lazy(() => RoundTeamScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  teamId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  roundId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const TeamCreateWithoutPlayersInputSchema: z.ZodType<Prisma.TeamCreateWithoutPlayersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  teamInTournaments: z.lazy(() => TeamTournamentCreateNestedManyWithoutTeamInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchCreateNestedManyWithoutTeamAInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchCreateNestedManyWithoutTeamBInputSchema).optional(),
  wonMatches: z.lazy(() => MatchCreateNestedManyWithoutWinnerInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamCreateNestedManyWithoutTeamInputSchema).optional()
}).strict();

export const TeamUncheckedCreateWithoutPlayersInputSchema: z.ZodType<Prisma.TeamUncheckedCreateWithoutPlayersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  teamInTournaments: z.lazy(() => TeamTournamentUncheckedCreateNestedManyWithoutTeamInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeamAInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeamBInputSchema).optional(),
  wonMatches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutWinnerInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUncheckedCreateNestedManyWithoutTeamInputSchema).optional()
}).strict();

export const TeamCreateOrConnectWithoutPlayersInputSchema: z.ZodType<Prisma.TeamCreateOrConnectWithoutPlayersInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TeamCreateWithoutPlayersInputSchema),z.lazy(() => TeamUncheckedCreateWithoutPlayersInputSchema) ]),
}).strict();

export const TeamUpsertWithoutPlayersInputSchema: z.ZodType<Prisma.TeamUpsertWithoutPlayersInput> = z.object({
  update: z.union([ z.lazy(() => TeamUpdateWithoutPlayersInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutPlayersInputSchema) ]),
  create: z.union([ z.lazy(() => TeamCreateWithoutPlayersInputSchema),z.lazy(() => TeamUncheckedCreateWithoutPlayersInputSchema) ]),
  where: z.lazy(() => TeamWhereInputSchema).optional()
}).strict();

export const TeamUpdateToOneWithWhereWithoutPlayersInputSchema: z.ZodType<Prisma.TeamUpdateToOneWithWhereWithoutPlayersInput> = z.object({
  where: z.lazy(() => TeamWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TeamUpdateWithoutPlayersInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutPlayersInputSchema) ]),
}).strict();

export const TeamUpdateWithoutPlayersInputSchema: z.ZodType<Prisma.TeamUpdateWithoutPlayersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentUpdateManyWithoutTeamNestedInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchUpdateManyWithoutTeamANestedInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchUpdateManyWithoutTeamBNestedInputSchema).optional(),
  wonMatches: z.lazy(() => MatchUpdateManyWithoutWinnerNestedInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUpdateManyWithoutTeamNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateWithoutPlayersInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateWithoutPlayersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentUncheckedUpdateManyWithoutTeamNestedInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchUncheckedUpdateManyWithoutTeamANestedInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchUncheckedUpdateManyWithoutTeamBNestedInputSchema).optional(),
  wonMatches: z.lazy(() => MatchUncheckedUpdateManyWithoutWinnerNestedInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUncheckedUpdateManyWithoutTeamNestedInputSchema).optional()
}).strict();

export const TournamentCreateWithoutEventInputSchema: z.ZodType<Prisma.TournamentCreateWithoutEventInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  phases: z.lazy(() => PhaseCreateNestedManyWithoutTournamentInputSchema).optional(),
  teams: z.lazy(() => TeamTournamentCreateNestedManyWithoutTournamentInputSchema).optional()
}).strict();

export const TournamentUncheckedCreateWithoutEventInputSchema: z.ZodType<Prisma.TournamentUncheckedCreateWithoutEventInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  phases: z.lazy(() => PhaseUncheckedCreateNestedManyWithoutTournamentInputSchema).optional(),
  teams: z.lazy(() => TeamTournamentUncheckedCreateNestedManyWithoutTournamentInputSchema).optional()
}).strict();

export const TournamentCreateOrConnectWithoutEventInputSchema: z.ZodType<Prisma.TournamentCreateOrConnectWithoutEventInput> = z.object({
  where: z.lazy(() => TournamentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TournamentCreateWithoutEventInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const TournamentCreateManyEventInputEnvelopeSchema: z.ZodType<Prisma.TournamentCreateManyEventInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TournamentCreateManyEventInputSchema),z.lazy(() => TournamentCreateManyEventInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TournamentUpsertWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.TournamentUpsertWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => TournamentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TournamentUpdateWithoutEventInputSchema),z.lazy(() => TournamentUncheckedUpdateWithoutEventInputSchema) ]),
  create: z.union([ z.lazy(() => TournamentCreateWithoutEventInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutEventInputSchema) ]),
}).strict();

export const TournamentUpdateWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.TournamentUpdateWithWhereUniqueWithoutEventInput> = z.object({
  where: z.lazy(() => TournamentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TournamentUpdateWithoutEventInputSchema),z.lazy(() => TournamentUncheckedUpdateWithoutEventInputSchema) ]),
}).strict();

export const TournamentUpdateManyWithWhereWithoutEventInputSchema: z.ZodType<Prisma.TournamentUpdateManyWithWhereWithoutEventInput> = z.object({
  where: z.lazy(() => TournamentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TournamentUpdateManyMutationInputSchema),z.lazy(() => TournamentUncheckedUpdateManyWithoutEventInputSchema) ]),
}).strict();

export const TournamentScalarWhereInputSchema: z.ZodType<Prisma.TournamentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TournamentScalarWhereInputSchema),z.lazy(() => TournamentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TournamentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TournamentScalarWhereInputSchema),z.lazy(() => TournamentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  eventId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  endDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const EventCreateWithoutTournamentsInputSchema: z.ZodType<Prisma.EventCreateWithoutTournamentsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const EventUncheckedCreateWithoutTournamentsInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutTournamentsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const EventCreateOrConnectWithoutTournamentsInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutTournamentsInput> = z.object({
  where: z.lazy(() => EventWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EventCreateWithoutTournamentsInputSchema),z.lazy(() => EventUncheckedCreateWithoutTournamentsInputSchema) ]),
}).strict();

export const PhaseCreateWithoutTournamentInputSchema: z.ZodType<Prisma.PhaseCreateWithoutTournamentInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  type: z.lazy(() => PhaseTypeSchema).optional(),
  rounds: z.lazy(() => RoundCreateNestedManyWithoutPhaseInputSchema).optional(),
  previousPhase: z.lazy(() => PhaseCreateNestedOneWithoutNextPhaseRelationInputSchema).optional(),
  nextPhaseRelation: z.lazy(() => PhaseCreateNestedOneWithoutPreviousPhaseInputSchema).optional(),
  nextPhase: z.lazy(() => PhaseCreateNestedOneWithoutPreviousPhaseRelationInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseCreateNestedOneWithoutNextPhaseInputSchema).optional()
}).strict();

export const PhaseUncheckedCreateWithoutTournamentInputSchema: z.ZodType<Prisma.PhaseUncheckedCreateWithoutTournamentInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  type: z.lazy(() => PhaseTypeSchema).optional(),
  previousPhaseId: z.string().optional().nullable(),
  nextPhaseId: z.string().optional().nullable(),
  rounds: z.lazy(() => RoundUncheckedCreateNestedManyWithoutPhaseInputSchema).optional(),
  nextPhaseRelation: z.lazy(() => PhaseUncheckedCreateNestedOneWithoutPreviousPhaseInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseUncheckedCreateNestedOneWithoutNextPhaseInputSchema).optional()
}).strict();

export const PhaseCreateOrConnectWithoutTournamentInputSchema: z.ZodType<Prisma.PhaseCreateOrConnectWithoutTournamentInput> = z.object({
  where: z.lazy(() => PhaseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PhaseCreateWithoutTournamentInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutTournamentInputSchema) ]),
}).strict();

export const PhaseCreateManyTournamentInputEnvelopeSchema: z.ZodType<Prisma.PhaseCreateManyTournamentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PhaseCreateManyTournamentInputSchema),z.lazy(() => PhaseCreateManyTournamentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TeamTournamentCreateWithoutTournamentInputSchema: z.ZodType<Prisma.TeamTournamentCreateWithoutTournamentInput> = z.object({
  id: z.string().cuid().optional(),
  seed: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  team: z.lazy(() => TeamCreateNestedOneWithoutTeamInTournamentsInputSchema)
}).strict();

export const TeamTournamentUncheckedCreateWithoutTournamentInputSchema: z.ZodType<Prisma.TeamTournamentUncheckedCreateWithoutTournamentInput> = z.object({
  id: z.string().cuid().optional(),
  teamId: z.string(),
  seed: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TeamTournamentCreateOrConnectWithoutTournamentInputSchema: z.ZodType<Prisma.TeamTournamentCreateOrConnectWithoutTournamentInput> = z.object({
  where: z.lazy(() => TeamTournamentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TeamTournamentCreateWithoutTournamentInputSchema),z.lazy(() => TeamTournamentUncheckedCreateWithoutTournamentInputSchema) ]),
}).strict();

export const TeamTournamentCreateManyTournamentInputEnvelopeSchema: z.ZodType<Prisma.TeamTournamentCreateManyTournamentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TeamTournamentCreateManyTournamentInputSchema),z.lazy(() => TeamTournamentCreateManyTournamentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const EventUpsertWithoutTournamentsInputSchema: z.ZodType<Prisma.EventUpsertWithoutTournamentsInput> = z.object({
  update: z.union([ z.lazy(() => EventUpdateWithoutTournamentsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutTournamentsInputSchema) ]),
  create: z.union([ z.lazy(() => EventCreateWithoutTournamentsInputSchema),z.lazy(() => EventUncheckedCreateWithoutTournamentsInputSchema) ]),
  where: z.lazy(() => EventWhereInputSchema).optional()
}).strict();

export const EventUpdateToOneWithWhereWithoutTournamentsInputSchema: z.ZodType<Prisma.EventUpdateToOneWithWhereWithoutTournamentsInput> = z.object({
  where: z.lazy(() => EventWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => EventUpdateWithoutTournamentsInputSchema),z.lazy(() => EventUncheckedUpdateWithoutTournamentsInputSchema) ]),
}).strict();

export const EventUpdateWithoutTournamentsInputSchema: z.ZodType<Prisma.EventUpdateWithoutTournamentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EventUncheckedUpdateWithoutTournamentsInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutTournamentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PhaseUpsertWithWhereUniqueWithoutTournamentInputSchema: z.ZodType<Prisma.PhaseUpsertWithWhereUniqueWithoutTournamentInput> = z.object({
  where: z.lazy(() => PhaseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PhaseUpdateWithoutTournamentInputSchema),z.lazy(() => PhaseUncheckedUpdateWithoutTournamentInputSchema) ]),
  create: z.union([ z.lazy(() => PhaseCreateWithoutTournamentInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutTournamentInputSchema) ]),
}).strict();

export const PhaseUpdateWithWhereUniqueWithoutTournamentInputSchema: z.ZodType<Prisma.PhaseUpdateWithWhereUniqueWithoutTournamentInput> = z.object({
  where: z.lazy(() => PhaseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PhaseUpdateWithoutTournamentInputSchema),z.lazy(() => PhaseUncheckedUpdateWithoutTournamentInputSchema) ]),
}).strict();

export const PhaseUpdateManyWithWhereWithoutTournamentInputSchema: z.ZodType<Prisma.PhaseUpdateManyWithWhereWithoutTournamentInput> = z.object({
  where: z.lazy(() => PhaseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PhaseUpdateManyMutationInputSchema),z.lazy(() => PhaseUncheckedUpdateManyWithoutTournamentInputSchema) ]),
}).strict();

export const PhaseScalarWhereInputSchema: z.ZodType<Prisma.PhaseScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PhaseScalarWhereInputSchema),z.lazy(() => PhaseScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PhaseScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PhaseScalarWhereInputSchema),z.lazy(() => PhaseScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tournamentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumPhaseTypeFilterSchema),z.lazy(() => PhaseTypeSchema) ]).optional(),
  previousPhaseId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  nextPhaseId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const TeamTournamentUpsertWithWhereUniqueWithoutTournamentInputSchema: z.ZodType<Prisma.TeamTournamentUpsertWithWhereUniqueWithoutTournamentInput> = z.object({
  where: z.lazy(() => TeamTournamentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TeamTournamentUpdateWithoutTournamentInputSchema),z.lazy(() => TeamTournamentUncheckedUpdateWithoutTournamentInputSchema) ]),
  create: z.union([ z.lazy(() => TeamTournamentCreateWithoutTournamentInputSchema),z.lazy(() => TeamTournamentUncheckedCreateWithoutTournamentInputSchema) ]),
}).strict();

export const TeamTournamentUpdateWithWhereUniqueWithoutTournamentInputSchema: z.ZodType<Prisma.TeamTournamentUpdateWithWhereUniqueWithoutTournamentInput> = z.object({
  where: z.lazy(() => TeamTournamentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TeamTournamentUpdateWithoutTournamentInputSchema),z.lazy(() => TeamTournamentUncheckedUpdateWithoutTournamentInputSchema) ]),
}).strict();

export const TeamTournamentUpdateManyWithWhereWithoutTournamentInputSchema: z.ZodType<Prisma.TeamTournamentUpdateManyWithWhereWithoutTournamentInput> = z.object({
  where: z.lazy(() => TeamTournamentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TeamTournamentUpdateManyMutationInputSchema),z.lazy(() => TeamTournamentUncheckedUpdateManyWithoutTournamentInputSchema) ]),
}).strict();

export const TournamentCreateWithoutTeamsInputSchema: z.ZodType<Prisma.TournamentCreateWithoutTeamsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  event: z.lazy(() => EventCreateNestedOneWithoutTournamentsInputSchema),
  phases: z.lazy(() => PhaseCreateNestedManyWithoutTournamentInputSchema).optional()
}).strict();

export const TournamentUncheckedCreateWithoutTeamsInputSchema: z.ZodType<Prisma.TournamentUncheckedCreateWithoutTeamsInput> = z.object({
  id: z.string().cuid().optional(),
  eventId: z.string(),
  name: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  phases: z.lazy(() => PhaseUncheckedCreateNestedManyWithoutTournamentInputSchema).optional()
}).strict();

export const TournamentCreateOrConnectWithoutTeamsInputSchema: z.ZodType<Prisma.TournamentCreateOrConnectWithoutTeamsInput> = z.object({
  where: z.lazy(() => TournamentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TournamentCreateWithoutTeamsInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutTeamsInputSchema) ]),
}).strict();

export const TeamCreateWithoutTeamInTournamentsInputSchema: z.ZodType<Prisma.TeamCreateWithoutTeamInTournamentsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  players: z.lazy(() => PlayerCreateNestedManyWithoutTeamInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchCreateNestedManyWithoutTeamAInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchCreateNestedManyWithoutTeamBInputSchema).optional(),
  wonMatches: z.lazy(() => MatchCreateNestedManyWithoutWinnerInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamCreateNestedManyWithoutTeamInputSchema).optional()
}).strict();

export const TeamUncheckedCreateWithoutTeamInTournamentsInputSchema: z.ZodType<Prisma.TeamUncheckedCreateWithoutTeamInTournamentsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  players: z.lazy(() => PlayerUncheckedCreateNestedManyWithoutTeamInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeamAInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeamBInputSchema).optional(),
  wonMatches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutWinnerInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUncheckedCreateNestedManyWithoutTeamInputSchema).optional()
}).strict();

export const TeamCreateOrConnectWithoutTeamInTournamentsInputSchema: z.ZodType<Prisma.TeamCreateOrConnectWithoutTeamInTournamentsInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TeamCreateWithoutTeamInTournamentsInputSchema),z.lazy(() => TeamUncheckedCreateWithoutTeamInTournamentsInputSchema) ]),
}).strict();

export const TournamentUpsertWithoutTeamsInputSchema: z.ZodType<Prisma.TournamentUpsertWithoutTeamsInput> = z.object({
  update: z.union([ z.lazy(() => TournamentUpdateWithoutTeamsInputSchema),z.lazy(() => TournamentUncheckedUpdateWithoutTeamsInputSchema) ]),
  create: z.union([ z.lazy(() => TournamentCreateWithoutTeamsInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutTeamsInputSchema) ]),
  where: z.lazy(() => TournamentWhereInputSchema).optional()
}).strict();

export const TournamentUpdateToOneWithWhereWithoutTeamsInputSchema: z.ZodType<Prisma.TournamentUpdateToOneWithWhereWithoutTeamsInput> = z.object({
  where: z.lazy(() => TournamentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TournamentUpdateWithoutTeamsInputSchema),z.lazy(() => TournamentUncheckedUpdateWithoutTeamsInputSchema) ]),
}).strict();

export const TournamentUpdateWithoutTeamsInputSchema: z.ZodType<Prisma.TournamentUpdateWithoutTeamsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  event: z.lazy(() => EventUpdateOneRequiredWithoutTournamentsNestedInputSchema).optional(),
  phases: z.lazy(() => PhaseUpdateManyWithoutTournamentNestedInputSchema).optional()
}).strict();

export const TournamentUncheckedUpdateWithoutTeamsInputSchema: z.ZodType<Prisma.TournamentUncheckedUpdateWithoutTeamsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  phases: z.lazy(() => PhaseUncheckedUpdateManyWithoutTournamentNestedInputSchema).optional()
}).strict();

export const TeamUpsertWithoutTeamInTournamentsInputSchema: z.ZodType<Prisma.TeamUpsertWithoutTeamInTournamentsInput> = z.object({
  update: z.union([ z.lazy(() => TeamUpdateWithoutTeamInTournamentsInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutTeamInTournamentsInputSchema) ]),
  create: z.union([ z.lazy(() => TeamCreateWithoutTeamInTournamentsInputSchema),z.lazy(() => TeamUncheckedCreateWithoutTeamInTournamentsInputSchema) ]),
  where: z.lazy(() => TeamWhereInputSchema).optional()
}).strict();

export const TeamUpdateToOneWithWhereWithoutTeamInTournamentsInputSchema: z.ZodType<Prisma.TeamUpdateToOneWithWhereWithoutTeamInTournamentsInput> = z.object({
  where: z.lazy(() => TeamWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TeamUpdateWithoutTeamInTournamentsInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutTeamInTournamentsInputSchema) ]),
}).strict();

export const TeamUpdateWithoutTeamInTournamentsInputSchema: z.ZodType<Prisma.TeamUpdateWithoutTeamInTournamentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => PlayerUpdateManyWithoutTeamNestedInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchUpdateManyWithoutTeamANestedInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchUpdateManyWithoutTeamBNestedInputSchema).optional(),
  wonMatches: z.lazy(() => MatchUpdateManyWithoutWinnerNestedInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUpdateManyWithoutTeamNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateWithoutTeamInTournamentsInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateWithoutTeamInTournamentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => PlayerUncheckedUpdateManyWithoutTeamNestedInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchUncheckedUpdateManyWithoutTeamANestedInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchUncheckedUpdateManyWithoutTeamBNestedInputSchema).optional(),
  wonMatches: z.lazy(() => MatchUncheckedUpdateManyWithoutWinnerNestedInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUncheckedUpdateManyWithoutTeamNestedInputSchema).optional()
}).strict();

export const TournamentCreateWithoutPhasesInputSchema: z.ZodType<Prisma.TournamentCreateWithoutPhasesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  event: z.lazy(() => EventCreateNestedOneWithoutTournamentsInputSchema),
  teams: z.lazy(() => TeamTournamentCreateNestedManyWithoutTournamentInputSchema).optional()
}).strict();

export const TournamentUncheckedCreateWithoutPhasesInputSchema: z.ZodType<Prisma.TournamentUncheckedCreateWithoutPhasesInput> = z.object({
  id: z.string().cuid().optional(),
  eventId: z.string(),
  name: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  teams: z.lazy(() => TeamTournamentUncheckedCreateNestedManyWithoutTournamentInputSchema).optional()
}).strict();

export const TournamentCreateOrConnectWithoutPhasesInputSchema: z.ZodType<Prisma.TournamentCreateOrConnectWithoutPhasesInput> = z.object({
  where: z.lazy(() => TournamentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TournamentCreateWithoutPhasesInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutPhasesInputSchema) ]),
}).strict();

export const RoundCreateWithoutPhaseInputSchema: z.ZodType<Prisma.RoundCreateWithoutPhaseInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional().nullable(),
  roundNumber: z.number().int().optional().nullable(),
  matches: z.lazy(() => MatchRoundCreateNestedManyWithoutRoundInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamCreateNestedManyWithoutRoundInputSchema).optional()
}).strict();

export const RoundUncheckedCreateWithoutPhaseInputSchema: z.ZodType<Prisma.RoundUncheckedCreateWithoutPhaseInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional().nullable(),
  roundNumber: z.number().int().optional().nullable(),
  matches: z.lazy(() => MatchRoundUncheckedCreateNestedManyWithoutRoundInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUncheckedCreateNestedManyWithoutRoundInputSchema).optional()
}).strict();

export const RoundCreateOrConnectWithoutPhaseInputSchema: z.ZodType<Prisma.RoundCreateOrConnectWithoutPhaseInput> = z.object({
  where: z.lazy(() => RoundWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoundCreateWithoutPhaseInputSchema),z.lazy(() => RoundUncheckedCreateWithoutPhaseInputSchema) ]),
}).strict();

export const RoundCreateManyPhaseInputEnvelopeSchema: z.ZodType<Prisma.RoundCreateManyPhaseInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RoundCreateManyPhaseInputSchema),z.lazy(() => RoundCreateManyPhaseInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PhaseCreateWithoutNextPhaseRelationInputSchema: z.ZodType<Prisma.PhaseCreateWithoutNextPhaseRelationInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  type: z.lazy(() => PhaseTypeSchema).optional(),
  tournament: z.lazy(() => TournamentCreateNestedOneWithoutPhasesInputSchema),
  rounds: z.lazy(() => RoundCreateNestedManyWithoutPhaseInputSchema).optional(),
  previousPhase: z.lazy(() => PhaseCreateNestedOneWithoutNextPhaseRelationInputSchema).optional(),
  nextPhase: z.lazy(() => PhaseCreateNestedOneWithoutPreviousPhaseRelationInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseCreateNestedOneWithoutNextPhaseInputSchema).optional()
}).strict();

export const PhaseUncheckedCreateWithoutNextPhaseRelationInputSchema: z.ZodType<Prisma.PhaseUncheckedCreateWithoutNextPhaseRelationInput> = z.object({
  id: z.string().uuid().optional(),
  tournamentId: z.string(),
  name: z.string(),
  type: z.lazy(() => PhaseTypeSchema).optional(),
  previousPhaseId: z.string().optional().nullable(),
  nextPhaseId: z.string().optional().nullable(),
  rounds: z.lazy(() => RoundUncheckedCreateNestedManyWithoutPhaseInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseUncheckedCreateNestedOneWithoutNextPhaseInputSchema).optional()
}).strict();

export const PhaseCreateOrConnectWithoutNextPhaseRelationInputSchema: z.ZodType<Prisma.PhaseCreateOrConnectWithoutNextPhaseRelationInput> = z.object({
  where: z.lazy(() => PhaseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PhaseCreateWithoutNextPhaseRelationInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutNextPhaseRelationInputSchema) ]),
}).strict();

export const PhaseCreateWithoutPreviousPhaseInputSchema: z.ZodType<Prisma.PhaseCreateWithoutPreviousPhaseInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  type: z.lazy(() => PhaseTypeSchema).optional(),
  tournament: z.lazy(() => TournamentCreateNestedOneWithoutPhasesInputSchema),
  rounds: z.lazy(() => RoundCreateNestedManyWithoutPhaseInputSchema).optional(),
  nextPhaseRelation: z.lazy(() => PhaseCreateNestedOneWithoutPreviousPhaseInputSchema).optional(),
  nextPhase: z.lazy(() => PhaseCreateNestedOneWithoutPreviousPhaseRelationInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseCreateNestedOneWithoutNextPhaseInputSchema).optional()
}).strict();

export const PhaseUncheckedCreateWithoutPreviousPhaseInputSchema: z.ZodType<Prisma.PhaseUncheckedCreateWithoutPreviousPhaseInput> = z.object({
  id: z.string().uuid().optional(),
  tournamentId: z.string(),
  name: z.string(),
  type: z.lazy(() => PhaseTypeSchema).optional(),
  nextPhaseId: z.string().optional().nullable(),
  rounds: z.lazy(() => RoundUncheckedCreateNestedManyWithoutPhaseInputSchema).optional(),
  nextPhaseRelation: z.lazy(() => PhaseUncheckedCreateNestedOneWithoutPreviousPhaseInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseUncheckedCreateNestedOneWithoutNextPhaseInputSchema).optional()
}).strict();

export const PhaseCreateOrConnectWithoutPreviousPhaseInputSchema: z.ZodType<Prisma.PhaseCreateOrConnectWithoutPreviousPhaseInput> = z.object({
  where: z.lazy(() => PhaseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PhaseCreateWithoutPreviousPhaseInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutPreviousPhaseInputSchema) ]),
}).strict();

export const PhaseCreateWithoutPreviousPhaseRelationInputSchema: z.ZodType<Prisma.PhaseCreateWithoutPreviousPhaseRelationInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  type: z.lazy(() => PhaseTypeSchema).optional(),
  tournament: z.lazy(() => TournamentCreateNestedOneWithoutPhasesInputSchema),
  rounds: z.lazy(() => RoundCreateNestedManyWithoutPhaseInputSchema).optional(),
  previousPhase: z.lazy(() => PhaseCreateNestedOneWithoutNextPhaseRelationInputSchema).optional(),
  nextPhaseRelation: z.lazy(() => PhaseCreateNestedOneWithoutPreviousPhaseInputSchema).optional(),
  nextPhase: z.lazy(() => PhaseCreateNestedOneWithoutPreviousPhaseRelationInputSchema).optional()
}).strict();

export const PhaseUncheckedCreateWithoutPreviousPhaseRelationInputSchema: z.ZodType<Prisma.PhaseUncheckedCreateWithoutPreviousPhaseRelationInput> = z.object({
  id: z.string().uuid().optional(),
  tournamentId: z.string(),
  name: z.string(),
  type: z.lazy(() => PhaseTypeSchema).optional(),
  previousPhaseId: z.string().optional().nullable(),
  nextPhaseId: z.string().optional().nullable(),
  rounds: z.lazy(() => RoundUncheckedCreateNestedManyWithoutPhaseInputSchema).optional(),
  nextPhaseRelation: z.lazy(() => PhaseUncheckedCreateNestedOneWithoutPreviousPhaseInputSchema).optional()
}).strict();

export const PhaseCreateOrConnectWithoutPreviousPhaseRelationInputSchema: z.ZodType<Prisma.PhaseCreateOrConnectWithoutPreviousPhaseRelationInput> = z.object({
  where: z.lazy(() => PhaseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PhaseCreateWithoutPreviousPhaseRelationInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutPreviousPhaseRelationInputSchema) ]),
}).strict();

export const PhaseCreateWithoutNextPhaseInputSchema: z.ZodType<Prisma.PhaseCreateWithoutNextPhaseInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  type: z.lazy(() => PhaseTypeSchema).optional(),
  tournament: z.lazy(() => TournamentCreateNestedOneWithoutPhasesInputSchema),
  rounds: z.lazy(() => RoundCreateNestedManyWithoutPhaseInputSchema).optional(),
  previousPhase: z.lazy(() => PhaseCreateNestedOneWithoutNextPhaseRelationInputSchema).optional(),
  nextPhaseRelation: z.lazy(() => PhaseCreateNestedOneWithoutPreviousPhaseInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseCreateNestedOneWithoutNextPhaseInputSchema).optional()
}).strict();

export const PhaseUncheckedCreateWithoutNextPhaseInputSchema: z.ZodType<Prisma.PhaseUncheckedCreateWithoutNextPhaseInput> = z.object({
  id: z.string().uuid().optional(),
  tournamentId: z.string(),
  name: z.string(),
  type: z.lazy(() => PhaseTypeSchema).optional(),
  previousPhaseId: z.string().optional().nullable(),
  rounds: z.lazy(() => RoundUncheckedCreateNestedManyWithoutPhaseInputSchema).optional(),
  nextPhaseRelation: z.lazy(() => PhaseUncheckedCreateNestedOneWithoutPreviousPhaseInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseUncheckedCreateNestedOneWithoutNextPhaseInputSchema).optional()
}).strict();

export const PhaseCreateOrConnectWithoutNextPhaseInputSchema: z.ZodType<Prisma.PhaseCreateOrConnectWithoutNextPhaseInput> = z.object({
  where: z.lazy(() => PhaseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PhaseCreateWithoutNextPhaseInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutNextPhaseInputSchema) ]),
}).strict();

export const TournamentUpsertWithoutPhasesInputSchema: z.ZodType<Prisma.TournamentUpsertWithoutPhasesInput> = z.object({
  update: z.union([ z.lazy(() => TournamentUpdateWithoutPhasesInputSchema),z.lazy(() => TournamentUncheckedUpdateWithoutPhasesInputSchema) ]),
  create: z.union([ z.lazy(() => TournamentCreateWithoutPhasesInputSchema),z.lazy(() => TournamentUncheckedCreateWithoutPhasesInputSchema) ]),
  where: z.lazy(() => TournamentWhereInputSchema).optional()
}).strict();

export const TournamentUpdateToOneWithWhereWithoutPhasesInputSchema: z.ZodType<Prisma.TournamentUpdateToOneWithWhereWithoutPhasesInput> = z.object({
  where: z.lazy(() => TournamentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TournamentUpdateWithoutPhasesInputSchema),z.lazy(() => TournamentUncheckedUpdateWithoutPhasesInputSchema) ]),
}).strict();

export const TournamentUpdateWithoutPhasesInputSchema: z.ZodType<Prisma.TournamentUpdateWithoutPhasesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  event: z.lazy(() => EventUpdateOneRequiredWithoutTournamentsNestedInputSchema).optional(),
  teams: z.lazy(() => TeamTournamentUpdateManyWithoutTournamentNestedInputSchema).optional()
}).strict();

export const TournamentUncheckedUpdateWithoutPhasesInputSchema: z.ZodType<Prisma.TournamentUncheckedUpdateWithoutPhasesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  eventId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  teams: z.lazy(() => TeamTournamentUncheckedUpdateManyWithoutTournamentNestedInputSchema).optional()
}).strict();

export const RoundUpsertWithWhereUniqueWithoutPhaseInputSchema: z.ZodType<Prisma.RoundUpsertWithWhereUniqueWithoutPhaseInput> = z.object({
  where: z.lazy(() => RoundWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RoundUpdateWithoutPhaseInputSchema),z.lazy(() => RoundUncheckedUpdateWithoutPhaseInputSchema) ]),
  create: z.union([ z.lazy(() => RoundCreateWithoutPhaseInputSchema),z.lazy(() => RoundUncheckedCreateWithoutPhaseInputSchema) ]),
}).strict();

export const RoundUpdateWithWhereUniqueWithoutPhaseInputSchema: z.ZodType<Prisma.RoundUpdateWithWhereUniqueWithoutPhaseInput> = z.object({
  where: z.lazy(() => RoundWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RoundUpdateWithoutPhaseInputSchema),z.lazy(() => RoundUncheckedUpdateWithoutPhaseInputSchema) ]),
}).strict();

export const RoundUpdateManyWithWhereWithoutPhaseInputSchema: z.ZodType<Prisma.RoundUpdateManyWithWhereWithoutPhaseInput> = z.object({
  where: z.lazy(() => RoundScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RoundUpdateManyMutationInputSchema),z.lazy(() => RoundUncheckedUpdateManyWithoutPhaseInputSchema) ]),
}).strict();

export const RoundScalarWhereInputSchema: z.ZodType<Prisma.RoundScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RoundScalarWhereInputSchema),z.lazy(() => RoundScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoundScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoundScalarWhereInputSchema),z.lazy(() => RoundScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phaseId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  roundNumber: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const PhaseUpsertWithoutNextPhaseRelationInputSchema: z.ZodType<Prisma.PhaseUpsertWithoutNextPhaseRelationInput> = z.object({
  update: z.union([ z.lazy(() => PhaseUpdateWithoutNextPhaseRelationInputSchema),z.lazy(() => PhaseUncheckedUpdateWithoutNextPhaseRelationInputSchema) ]),
  create: z.union([ z.lazy(() => PhaseCreateWithoutNextPhaseRelationInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutNextPhaseRelationInputSchema) ]),
  where: z.lazy(() => PhaseWhereInputSchema).optional()
}).strict();

export const PhaseUpdateToOneWithWhereWithoutNextPhaseRelationInputSchema: z.ZodType<Prisma.PhaseUpdateToOneWithWhereWithoutNextPhaseRelationInput> = z.object({
  where: z.lazy(() => PhaseWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PhaseUpdateWithoutNextPhaseRelationInputSchema),z.lazy(() => PhaseUncheckedUpdateWithoutNextPhaseRelationInputSchema) ]),
}).strict();

export const PhaseUpdateWithoutNextPhaseRelationInputSchema: z.ZodType<Prisma.PhaseUpdateWithoutNextPhaseRelationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PhaseTypeSchema),z.lazy(() => EnumPhaseTypeFieldUpdateOperationsInputSchema) ]).optional(),
  tournament: z.lazy(() => TournamentUpdateOneRequiredWithoutPhasesNestedInputSchema).optional(),
  rounds: z.lazy(() => RoundUpdateManyWithoutPhaseNestedInputSchema).optional(),
  previousPhase: z.lazy(() => PhaseUpdateOneWithoutNextPhaseRelationNestedInputSchema).optional(),
  nextPhase: z.lazy(() => PhaseUpdateOneWithoutPreviousPhaseRelationNestedInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseUpdateOneWithoutNextPhaseNestedInputSchema).optional()
}).strict();

export const PhaseUncheckedUpdateWithoutNextPhaseRelationInputSchema: z.ZodType<Prisma.PhaseUncheckedUpdateWithoutNextPhaseRelationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PhaseTypeSchema),z.lazy(() => EnumPhaseTypeFieldUpdateOperationsInputSchema) ]).optional(),
  previousPhaseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextPhaseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rounds: z.lazy(() => RoundUncheckedUpdateManyWithoutPhaseNestedInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseUncheckedUpdateOneWithoutNextPhaseNestedInputSchema).optional()
}).strict();

export const PhaseUpsertWithoutPreviousPhaseInputSchema: z.ZodType<Prisma.PhaseUpsertWithoutPreviousPhaseInput> = z.object({
  update: z.union([ z.lazy(() => PhaseUpdateWithoutPreviousPhaseInputSchema),z.lazy(() => PhaseUncheckedUpdateWithoutPreviousPhaseInputSchema) ]),
  create: z.union([ z.lazy(() => PhaseCreateWithoutPreviousPhaseInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutPreviousPhaseInputSchema) ]),
  where: z.lazy(() => PhaseWhereInputSchema).optional()
}).strict();

export const PhaseUpdateToOneWithWhereWithoutPreviousPhaseInputSchema: z.ZodType<Prisma.PhaseUpdateToOneWithWhereWithoutPreviousPhaseInput> = z.object({
  where: z.lazy(() => PhaseWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PhaseUpdateWithoutPreviousPhaseInputSchema),z.lazy(() => PhaseUncheckedUpdateWithoutPreviousPhaseInputSchema) ]),
}).strict();

export const PhaseUpdateWithoutPreviousPhaseInputSchema: z.ZodType<Prisma.PhaseUpdateWithoutPreviousPhaseInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PhaseTypeSchema),z.lazy(() => EnumPhaseTypeFieldUpdateOperationsInputSchema) ]).optional(),
  tournament: z.lazy(() => TournamentUpdateOneRequiredWithoutPhasesNestedInputSchema).optional(),
  rounds: z.lazy(() => RoundUpdateManyWithoutPhaseNestedInputSchema).optional(),
  nextPhaseRelation: z.lazy(() => PhaseUpdateOneWithoutPreviousPhaseNestedInputSchema).optional(),
  nextPhase: z.lazy(() => PhaseUpdateOneWithoutPreviousPhaseRelationNestedInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseUpdateOneWithoutNextPhaseNestedInputSchema).optional()
}).strict();

export const PhaseUncheckedUpdateWithoutPreviousPhaseInputSchema: z.ZodType<Prisma.PhaseUncheckedUpdateWithoutPreviousPhaseInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PhaseTypeSchema),z.lazy(() => EnumPhaseTypeFieldUpdateOperationsInputSchema) ]).optional(),
  nextPhaseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rounds: z.lazy(() => RoundUncheckedUpdateManyWithoutPhaseNestedInputSchema).optional(),
  nextPhaseRelation: z.lazy(() => PhaseUncheckedUpdateOneWithoutPreviousPhaseNestedInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseUncheckedUpdateOneWithoutNextPhaseNestedInputSchema).optional()
}).strict();

export const PhaseUpsertWithoutPreviousPhaseRelationInputSchema: z.ZodType<Prisma.PhaseUpsertWithoutPreviousPhaseRelationInput> = z.object({
  update: z.union([ z.lazy(() => PhaseUpdateWithoutPreviousPhaseRelationInputSchema),z.lazy(() => PhaseUncheckedUpdateWithoutPreviousPhaseRelationInputSchema) ]),
  create: z.union([ z.lazy(() => PhaseCreateWithoutPreviousPhaseRelationInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutPreviousPhaseRelationInputSchema) ]),
  where: z.lazy(() => PhaseWhereInputSchema).optional()
}).strict();

export const PhaseUpdateToOneWithWhereWithoutPreviousPhaseRelationInputSchema: z.ZodType<Prisma.PhaseUpdateToOneWithWhereWithoutPreviousPhaseRelationInput> = z.object({
  where: z.lazy(() => PhaseWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PhaseUpdateWithoutPreviousPhaseRelationInputSchema),z.lazy(() => PhaseUncheckedUpdateWithoutPreviousPhaseRelationInputSchema) ]),
}).strict();

export const PhaseUpdateWithoutPreviousPhaseRelationInputSchema: z.ZodType<Prisma.PhaseUpdateWithoutPreviousPhaseRelationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PhaseTypeSchema),z.lazy(() => EnumPhaseTypeFieldUpdateOperationsInputSchema) ]).optional(),
  tournament: z.lazy(() => TournamentUpdateOneRequiredWithoutPhasesNestedInputSchema).optional(),
  rounds: z.lazy(() => RoundUpdateManyWithoutPhaseNestedInputSchema).optional(),
  previousPhase: z.lazy(() => PhaseUpdateOneWithoutNextPhaseRelationNestedInputSchema).optional(),
  nextPhaseRelation: z.lazy(() => PhaseUpdateOneWithoutPreviousPhaseNestedInputSchema).optional(),
  nextPhase: z.lazy(() => PhaseUpdateOneWithoutPreviousPhaseRelationNestedInputSchema).optional()
}).strict();

export const PhaseUncheckedUpdateWithoutPreviousPhaseRelationInputSchema: z.ZodType<Prisma.PhaseUncheckedUpdateWithoutPreviousPhaseRelationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PhaseTypeSchema),z.lazy(() => EnumPhaseTypeFieldUpdateOperationsInputSchema) ]).optional(),
  previousPhaseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextPhaseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rounds: z.lazy(() => RoundUncheckedUpdateManyWithoutPhaseNestedInputSchema).optional(),
  nextPhaseRelation: z.lazy(() => PhaseUncheckedUpdateOneWithoutPreviousPhaseNestedInputSchema).optional()
}).strict();

export const PhaseUpsertWithoutNextPhaseInputSchema: z.ZodType<Prisma.PhaseUpsertWithoutNextPhaseInput> = z.object({
  update: z.union([ z.lazy(() => PhaseUpdateWithoutNextPhaseInputSchema),z.lazy(() => PhaseUncheckedUpdateWithoutNextPhaseInputSchema) ]),
  create: z.union([ z.lazy(() => PhaseCreateWithoutNextPhaseInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutNextPhaseInputSchema) ]),
  where: z.lazy(() => PhaseWhereInputSchema).optional()
}).strict();

export const PhaseUpdateToOneWithWhereWithoutNextPhaseInputSchema: z.ZodType<Prisma.PhaseUpdateToOneWithWhereWithoutNextPhaseInput> = z.object({
  where: z.lazy(() => PhaseWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PhaseUpdateWithoutNextPhaseInputSchema),z.lazy(() => PhaseUncheckedUpdateWithoutNextPhaseInputSchema) ]),
}).strict();

export const PhaseUpdateWithoutNextPhaseInputSchema: z.ZodType<Prisma.PhaseUpdateWithoutNextPhaseInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PhaseTypeSchema),z.lazy(() => EnumPhaseTypeFieldUpdateOperationsInputSchema) ]).optional(),
  tournament: z.lazy(() => TournamentUpdateOneRequiredWithoutPhasesNestedInputSchema).optional(),
  rounds: z.lazy(() => RoundUpdateManyWithoutPhaseNestedInputSchema).optional(),
  previousPhase: z.lazy(() => PhaseUpdateOneWithoutNextPhaseRelationNestedInputSchema).optional(),
  nextPhaseRelation: z.lazy(() => PhaseUpdateOneWithoutPreviousPhaseNestedInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseUpdateOneWithoutNextPhaseNestedInputSchema).optional()
}).strict();

export const PhaseUncheckedUpdateWithoutNextPhaseInputSchema: z.ZodType<Prisma.PhaseUncheckedUpdateWithoutNextPhaseInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PhaseTypeSchema),z.lazy(() => EnumPhaseTypeFieldUpdateOperationsInputSchema) ]).optional(),
  previousPhaseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rounds: z.lazy(() => RoundUncheckedUpdateManyWithoutPhaseNestedInputSchema).optional(),
  nextPhaseRelation: z.lazy(() => PhaseUncheckedUpdateOneWithoutPreviousPhaseNestedInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseUncheckedUpdateOneWithoutNextPhaseNestedInputSchema).optional()
}).strict();

export const PhaseCreateWithoutRoundsInputSchema: z.ZodType<Prisma.PhaseCreateWithoutRoundsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  type: z.lazy(() => PhaseTypeSchema).optional(),
  tournament: z.lazy(() => TournamentCreateNestedOneWithoutPhasesInputSchema),
  previousPhase: z.lazy(() => PhaseCreateNestedOneWithoutNextPhaseRelationInputSchema).optional(),
  nextPhaseRelation: z.lazy(() => PhaseCreateNestedOneWithoutPreviousPhaseInputSchema).optional(),
  nextPhase: z.lazy(() => PhaseCreateNestedOneWithoutPreviousPhaseRelationInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseCreateNestedOneWithoutNextPhaseInputSchema).optional()
}).strict();

export const PhaseUncheckedCreateWithoutRoundsInputSchema: z.ZodType<Prisma.PhaseUncheckedCreateWithoutRoundsInput> = z.object({
  id: z.string().uuid().optional(),
  tournamentId: z.string(),
  name: z.string(),
  type: z.lazy(() => PhaseTypeSchema).optional(),
  previousPhaseId: z.string().optional().nullable(),
  nextPhaseId: z.string().optional().nullable(),
  nextPhaseRelation: z.lazy(() => PhaseUncheckedCreateNestedOneWithoutPreviousPhaseInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseUncheckedCreateNestedOneWithoutNextPhaseInputSchema).optional()
}).strict();

export const PhaseCreateOrConnectWithoutRoundsInputSchema: z.ZodType<Prisma.PhaseCreateOrConnectWithoutRoundsInput> = z.object({
  where: z.lazy(() => PhaseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PhaseCreateWithoutRoundsInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutRoundsInputSchema) ]),
}).strict();

export const MatchRoundCreateWithoutRoundInputSchema: z.ZodType<Prisma.MatchRoundCreateWithoutRoundInput> = z.object({
  id: z.string().cuid().optional(),
  numRoundMatch: z.number().int(),
  match: z.lazy(() => MatchCreateNestedOneWithoutRoundInputSchema)
}).strict();

export const MatchRoundUncheckedCreateWithoutRoundInputSchema: z.ZodType<Prisma.MatchRoundUncheckedCreateWithoutRoundInput> = z.object({
  id: z.string().cuid().optional(),
  numRoundMatch: z.number().int(),
  matchId: z.string()
}).strict();

export const MatchRoundCreateOrConnectWithoutRoundInputSchema: z.ZodType<Prisma.MatchRoundCreateOrConnectWithoutRoundInput> = z.object({
  where: z.lazy(() => MatchRoundWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MatchRoundCreateWithoutRoundInputSchema),z.lazy(() => MatchRoundUncheckedCreateWithoutRoundInputSchema) ]),
}).strict();

export const MatchRoundCreateManyRoundInputEnvelopeSchema: z.ZodType<Prisma.MatchRoundCreateManyRoundInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MatchRoundCreateManyRoundInputSchema),z.lazy(() => MatchRoundCreateManyRoundInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RoundTeamCreateWithoutRoundInputSchema: z.ZodType<Prisma.RoundTeamCreateWithoutRoundInput> = z.object({
  id: z.string().cuid().optional(),
  team: z.lazy(() => TeamCreateNestedOneWithoutRoundTeamInputSchema)
}).strict();

export const RoundTeamUncheckedCreateWithoutRoundInputSchema: z.ZodType<Prisma.RoundTeamUncheckedCreateWithoutRoundInput> = z.object({
  id: z.string().cuid().optional(),
  teamId: z.string()
}).strict();

export const RoundTeamCreateOrConnectWithoutRoundInputSchema: z.ZodType<Prisma.RoundTeamCreateOrConnectWithoutRoundInput> = z.object({
  where: z.lazy(() => RoundTeamWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoundTeamCreateWithoutRoundInputSchema),z.lazy(() => RoundTeamUncheckedCreateWithoutRoundInputSchema) ]),
}).strict();

export const RoundTeamCreateManyRoundInputEnvelopeSchema: z.ZodType<Prisma.RoundTeamCreateManyRoundInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RoundTeamCreateManyRoundInputSchema),z.lazy(() => RoundTeamCreateManyRoundInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PhaseUpsertWithoutRoundsInputSchema: z.ZodType<Prisma.PhaseUpsertWithoutRoundsInput> = z.object({
  update: z.union([ z.lazy(() => PhaseUpdateWithoutRoundsInputSchema),z.lazy(() => PhaseUncheckedUpdateWithoutRoundsInputSchema) ]),
  create: z.union([ z.lazy(() => PhaseCreateWithoutRoundsInputSchema),z.lazy(() => PhaseUncheckedCreateWithoutRoundsInputSchema) ]),
  where: z.lazy(() => PhaseWhereInputSchema).optional()
}).strict();

export const PhaseUpdateToOneWithWhereWithoutRoundsInputSchema: z.ZodType<Prisma.PhaseUpdateToOneWithWhereWithoutRoundsInput> = z.object({
  where: z.lazy(() => PhaseWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PhaseUpdateWithoutRoundsInputSchema),z.lazy(() => PhaseUncheckedUpdateWithoutRoundsInputSchema) ]),
}).strict();

export const PhaseUpdateWithoutRoundsInputSchema: z.ZodType<Prisma.PhaseUpdateWithoutRoundsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PhaseTypeSchema),z.lazy(() => EnumPhaseTypeFieldUpdateOperationsInputSchema) ]).optional(),
  tournament: z.lazy(() => TournamentUpdateOneRequiredWithoutPhasesNestedInputSchema).optional(),
  previousPhase: z.lazy(() => PhaseUpdateOneWithoutNextPhaseRelationNestedInputSchema).optional(),
  nextPhaseRelation: z.lazy(() => PhaseUpdateOneWithoutPreviousPhaseNestedInputSchema).optional(),
  nextPhase: z.lazy(() => PhaseUpdateOneWithoutPreviousPhaseRelationNestedInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseUpdateOneWithoutNextPhaseNestedInputSchema).optional()
}).strict();

export const PhaseUncheckedUpdateWithoutRoundsInputSchema: z.ZodType<Prisma.PhaseUncheckedUpdateWithoutRoundsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PhaseTypeSchema),z.lazy(() => EnumPhaseTypeFieldUpdateOperationsInputSchema) ]).optional(),
  previousPhaseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextPhaseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextPhaseRelation: z.lazy(() => PhaseUncheckedUpdateOneWithoutPreviousPhaseNestedInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseUncheckedUpdateOneWithoutNextPhaseNestedInputSchema).optional()
}).strict();

export const MatchRoundUpsertWithWhereUniqueWithoutRoundInputSchema: z.ZodType<Prisma.MatchRoundUpsertWithWhereUniqueWithoutRoundInput> = z.object({
  where: z.lazy(() => MatchRoundWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MatchRoundUpdateWithoutRoundInputSchema),z.lazy(() => MatchRoundUncheckedUpdateWithoutRoundInputSchema) ]),
  create: z.union([ z.lazy(() => MatchRoundCreateWithoutRoundInputSchema),z.lazy(() => MatchRoundUncheckedCreateWithoutRoundInputSchema) ]),
}).strict();

export const MatchRoundUpdateWithWhereUniqueWithoutRoundInputSchema: z.ZodType<Prisma.MatchRoundUpdateWithWhereUniqueWithoutRoundInput> = z.object({
  where: z.lazy(() => MatchRoundWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MatchRoundUpdateWithoutRoundInputSchema),z.lazy(() => MatchRoundUncheckedUpdateWithoutRoundInputSchema) ]),
}).strict();

export const MatchRoundUpdateManyWithWhereWithoutRoundInputSchema: z.ZodType<Prisma.MatchRoundUpdateManyWithWhereWithoutRoundInput> = z.object({
  where: z.lazy(() => MatchRoundScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MatchRoundUpdateManyMutationInputSchema),z.lazy(() => MatchRoundUncheckedUpdateManyWithoutRoundInputSchema) ]),
}).strict();

export const MatchRoundScalarWhereInputSchema: z.ZodType<Prisma.MatchRoundScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MatchRoundScalarWhereInputSchema),z.lazy(() => MatchRoundScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MatchRoundScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MatchRoundScalarWhereInputSchema),z.lazy(() => MatchRoundScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  numRoundMatch: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  roundId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  matchId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const RoundTeamUpsertWithWhereUniqueWithoutRoundInputSchema: z.ZodType<Prisma.RoundTeamUpsertWithWhereUniqueWithoutRoundInput> = z.object({
  where: z.lazy(() => RoundTeamWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RoundTeamUpdateWithoutRoundInputSchema),z.lazy(() => RoundTeamUncheckedUpdateWithoutRoundInputSchema) ]),
  create: z.union([ z.lazy(() => RoundTeamCreateWithoutRoundInputSchema),z.lazy(() => RoundTeamUncheckedCreateWithoutRoundInputSchema) ]),
}).strict();

export const RoundTeamUpdateWithWhereUniqueWithoutRoundInputSchema: z.ZodType<Prisma.RoundTeamUpdateWithWhereUniqueWithoutRoundInput> = z.object({
  where: z.lazy(() => RoundTeamWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RoundTeamUpdateWithoutRoundInputSchema),z.lazy(() => RoundTeamUncheckedUpdateWithoutRoundInputSchema) ]),
}).strict();

export const RoundTeamUpdateManyWithWhereWithoutRoundInputSchema: z.ZodType<Prisma.RoundTeamUpdateManyWithWhereWithoutRoundInput> = z.object({
  where: z.lazy(() => RoundTeamScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RoundTeamUpdateManyMutationInputSchema),z.lazy(() => RoundTeamUncheckedUpdateManyWithoutRoundInputSchema) ]),
}).strict();

export const RoundCreateWithoutMatchesInputSchema: z.ZodType<Prisma.RoundCreateWithoutMatchesInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional().nullable(),
  roundNumber: z.number().int().optional().nullable(),
  phase: z.lazy(() => PhaseCreateNestedOneWithoutRoundsInputSchema),
  roundTeam: z.lazy(() => RoundTeamCreateNestedManyWithoutRoundInputSchema).optional()
}).strict();

export const RoundUncheckedCreateWithoutMatchesInputSchema: z.ZodType<Prisma.RoundUncheckedCreateWithoutMatchesInput> = z.object({
  id: z.string().uuid().optional(),
  phaseId: z.string(),
  name: z.string().optional().nullable(),
  roundNumber: z.number().int().optional().nullable(),
  roundTeam: z.lazy(() => RoundTeamUncheckedCreateNestedManyWithoutRoundInputSchema).optional()
}).strict();

export const RoundCreateOrConnectWithoutMatchesInputSchema: z.ZodType<Prisma.RoundCreateOrConnectWithoutMatchesInput> = z.object({
  where: z.lazy(() => RoundWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoundCreateWithoutMatchesInputSchema),z.lazy(() => RoundUncheckedCreateWithoutMatchesInputSchema) ]),
}).strict();

export const MatchCreateWithoutRoundInputSchema: z.ZodType<Prisma.MatchCreateWithoutRoundInput> = z.object({
  id: z.string().cuid().optional(),
  matchNumber: z.number().int().optional().nullable(),
  scoreTeamA: z.number().int().optional().nullable(),
  scoreTeamB: z.number().int().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  location: z.string().optional().nullable(),
  status: z.lazy(() => MatchStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  teamA: z.lazy(() => TeamCreateNestedOneWithoutMatchesTeamAInputSchema).optional(),
  teamB: z.lazy(() => TeamCreateNestedOneWithoutMatchesTeamBInputSchema).optional(),
  winner: z.lazy(() => TeamCreateNestedOneWithoutWonMatchesInputSchema).optional()
}).strict();

export const MatchUncheckedCreateWithoutRoundInputSchema: z.ZodType<Prisma.MatchUncheckedCreateWithoutRoundInput> = z.object({
  id: z.string().cuid().optional(),
  matchNumber: z.number().int().optional().nullable(),
  teamAId: z.string().optional().nullable(),
  teamBId: z.string().optional().nullable(),
  scoreTeamA: z.number().int().optional().nullable(),
  scoreTeamB: z.number().int().optional().nullable(),
  winnerId: z.string().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  location: z.string().optional().nullable(),
  status: z.lazy(() => MatchStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const MatchCreateOrConnectWithoutRoundInputSchema: z.ZodType<Prisma.MatchCreateOrConnectWithoutRoundInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MatchCreateWithoutRoundInputSchema),z.lazy(() => MatchUncheckedCreateWithoutRoundInputSchema) ]),
}).strict();

export const RoundUpsertWithoutMatchesInputSchema: z.ZodType<Prisma.RoundUpsertWithoutMatchesInput> = z.object({
  update: z.union([ z.lazy(() => RoundUpdateWithoutMatchesInputSchema),z.lazy(() => RoundUncheckedUpdateWithoutMatchesInputSchema) ]),
  create: z.union([ z.lazy(() => RoundCreateWithoutMatchesInputSchema),z.lazy(() => RoundUncheckedCreateWithoutMatchesInputSchema) ]),
  where: z.lazy(() => RoundWhereInputSchema).optional()
}).strict();

export const RoundUpdateToOneWithWhereWithoutMatchesInputSchema: z.ZodType<Prisma.RoundUpdateToOneWithWhereWithoutMatchesInput> = z.object({
  where: z.lazy(() => RoundWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RoundUpdateWithoutMatchesInputSchema),z.lazy(() => RoundUncheckedUpdateWithoutMatchesInputSchema) ]),
}).strict();

export const RoundUpdateWithoutMatchesInputSchema: z.ZodType<Prisma.RoundUpdateWithoutMatchesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roundNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phase: z.lazy(() => PhaseUpdateOneRequiredWithoutRoundsNestedInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUpdateManyWithoutRoundNestedInputSchema).optional()
}).strict();

export const RoundUncheckedUpdateWithoutMatchesInputSchema: z.ZodType<Prisma.RoundUncheckedUpdateWithoutMatchesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phaseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roundNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roundTeam: z.lazy(() => RoundTeamUncheckedUpdateManyWithoutRoundNestedInputSchema).optional()
}).strict();

export const MatchUpsertWithoutRoundInputSchema: z.ZodType<Prisma.MatchUpsertWithoutRoundInput> = z.object({
  update: z.union([ z.lazy(() => MatchUpdateWithoutRoundInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutRoundInputSchema) ]),
  create: z.union([ z.lazy(() => MatchCreateWithoutRoundInputSchema),z.lazy(() => MatchUncheckedCreateWithoutRoundInputSchema) ]),
  where: z.lazy(() => MatchWhereInputSchema).optional()
}).strict();

export const MatchUpdateToOneWithWhereWithoutRoundInputSchema: z.ZodType<Prisma.MatchUpdateToOneWithWhereWithoutRoundInput> = z.object({
  where: z.lazy(() => MatchWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MatchUpdateWithoutRoundInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutRoundInputSchema) ]),
}).strict();

export const MatchUpdateWithoutRoundInputSchema: z.ZodType<Prisma.MatchUpdateWithoutRoundInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  matchNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamA: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamB: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MatchStatusSchema),z.lazy(() => EnumMatchStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  teamA: z.lazy(() => TeamUpdateOneWithoutMatchesTeamANestedInputSchema).optional(),
  teamB: z.lazy(() => TeamUpdateOneWithoutMatchesTeamBNestedInputSchema).optional(),
  winner: z.lazy(() => TeamUpdateOneWithoutWonMatchesNestedInputSchema).optional()
}).strict();

export const MatchUncheckedUpdateWithoutRoundInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateWithoutRoundInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  matchNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  teamAId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  teamBId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamA: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamB: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  winnerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MatchStatusSchema),z.lazy(() => EnumMatchStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TeamCreateWithoutRoundTeamInputSchema: z.ZodType<Prisma.TeamCreateWithoutRoundTeamInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  players: z.lazy(() => PlayerCreateNestedManyWithoutTeamInputSchema).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentCreateNestedManyWithoutTeamInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchCreateNestedManyWithoutTeamAInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchCreateNestedManyWithoutTeamBInputSchema).optional(),
  wonMatches: z.lazy(() => MatchCreateNestedManyWithoutWinnerInputSchema).optional()
}).strict();

export const TeamUncheckedCreateWithoutRoundTeamInputSchema: z.ZodType<Prisma.TeamUncheckedCreateWithoutRoundTeamInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  players: z.lazy(() => PlayerUncheckedCreateNestedManyWithoutTeamInputSchema).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentUncheckedCreateNestedManyWithoutTeamInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeamAInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchUncheckedCreateNestedManyWithoutTeamBInputSchema).optional(),
  wonMatches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutWinnerInputSchema).optional()
}).strict();

export const TeamCreateOrConnectWithoutRoundTeamInputSchema: z.ZodType<Prisma.TeamCreateOrConnectWithoutRoundTeamInput> = z.object({
  where: z.lazy(() => TeamWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TeamCreateWithoutRoundTeamInputSchema),z.lazy(() => TeamUncheckedCreateWithoutRoundTeamInputSchema) ]),
}).strict();

export const RoundCreateWithoutRoundTeamInputSchema: z.ZodType<Prisma.RoundCreateWithoutRoundTeamInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional().nullable(),
  roundNumber: z.number().int().optional().nullable(),
  phase: z.lazy(() => PhaseCreateNestedOneWithoutRoundsInputSchema),
  matches: z.lazy(() => MatchRoundCreateNestedManyWithoutRoundInputSchema).optional()
}).strict();

export const RoundUncheckedCreateWithoutRoundTeamInputSchema: z.ZodType<Prisma.RoundUncheckedCreateWithoutRoundTeamInput> = z.object({
  id: z.string().uuid().optional(),
  phaseId: z.string(),
  name: z.string().optional().nullable(),
  roundNumber: z.number().int().optional().nullable(),
  matches: z.lazy(() => MatchRoundUncheckedCreateNestedManyWithoutRoundInputSchema).optional()
}).strict();

export const RoundCreateOrConnectWithoutRoundTeamInputSchema: z.ZodType<Prisma.RoundCreateOrConnectWithoutRoundTeamInput> = z.object({
  where: z.lazy(() => RoundWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoundCreateWithoutRoundTeamInputSchema),z.lazy(() => RoundUncheckedCreateWithoutRoundTeamInputSchema) ]),
}).strict();

export const TeamUpsertWithoutRoundTeamInputSchema: z.ZodType<Prisma.TeamUpsertWithoutRoundTeamInput> = z.object({
  update: z.union([ z.lazy(() => TeamUpdateWithoutRoundTeamInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutRoundTeamInputSchema) ]),
  create: z.union([ z.lazy(() => TeamCreateWithoutRoundTeamInputSchema),z.lazy(() => TeamUncheckedCreateWithoutRoundTeamInputSchema) ]),
  where: z.lazy(() => TeamWhereInputSchema).optional()
}).strict();

export const TeamUpdateToOneWithWhereWithoutRoundTeamInputSchema: z.ZodType<Prisma.TeamUpdateToOneWithWhereWithoutRoundTeamInput> = z.object({
  where: z.lazy(() => TeamWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TeamUpdateWithoutRoundTeamInputSchema),z.lazy(() => TeamUncheckedUpdateWithoutRoundTeamInputSchema) ]),
}).strict();

export const TeamUpdateWithoutRoundTeamInputSchema: z.ZodType<Prisma.TeamUpdateWithoutRoundTeamInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => PlayerUpdateManyWithoutTeamNestedInputSchema).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentUpdateManyWithoutTeamNestedInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchUpdateManyWithoutTeamANestedInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchUpdateManyWithoutTeamBNestedInputSchema).optional(),
  wonMatches: z.lazy(() => MatchUpdateManyWithoutWinnerNestedInputSchema).optional()
}).strict();

export const TeamUncheckedUpdateWithoutRoundTeamInputSchema: z.ZodType<Prisma.TeamUncheckedUpdateWithoutRoundTeamInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  players: z.lazy(() => PlayerUncheckedUpdateManyWithoutTeamNestedInputSchema).optional(),
  teamInTournaments: z.lazy(() => TeamTournamentUncheckedUpdateManyWithoutTeamNestedInputSchema).optional(),
  matchesTeamA: z.lazy(() => MatchUncheckedUpdateManyWithoutTeamANestedInputSchema).optional(),
  matchesTeamB: z.lazy(() => MatchUncheckedUpdateManyWithoutTeamBNestedInputSchema).optional(),
  wonMatches: z.lazy(() => MatchUncheckedUpdateManyWithoutWinnerNestedInputSchema).optional()
}).strict();

export const RoundUpsertWithoutRoundTeamInputSchema: z.ZodType<Prisma.RoundUpsertWithoutRoundTeamInput> = z.object({
  update: z.union([ z.lazy(() => RoundUpdateWithoutRoundTeamInputSchema),z.lazy(() => RoundUncheckedUpdateWithoutRoundTeamInputSchema) ]),
  create: z.union([ z.lazy(() => RoundCreateWithoutRoundTeamInputSchema),z.lazy(() => RoundUncheckedCreateWithoutRoundTeamInputSchema) ]),
  where: z.lazy(() => RoundWhereInputSchema).optional()
}).strict();

export const RoundUpdateToOneWithWhereWithoutRoundTeamInputSchema: z.ZodType<Prisma.RoundUpdateToOneWithWhereWithoutRoundTeamInput> = z.object({
  where: z.lazy(() => RoundWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RoundUpdateWithoutRoundTeamInputSchema),z.lazy(() => RoundUncheckedUpdateWithoutRoundTeamInputSchema) ]),
}).strict();

export const RoundUpdateWithoutRoundTeamInputSchema: z.ZodType<Prisma.RoundUpdateWithoutRoundTeamInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roundNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phase: z.lazy(() => PhaseUpdateOneRequiredWithoutRoundsNestedInputSchema).optional(),
  matches: z.lazy(() => MatchRoundUpdateManyWithoutRoundNestedInputSchema).optional()
}).strict();

export const RoundUncheckedUpdateWithoutRoundTeamInputSchema: z.ZodType<Prisma.RoundUncheckedUpdateWithoutRoundTeamInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phaseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roundNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  matches: z.lazy(() => MatchRoundUncheckedUpdateManyWithoutRoundNestedInputSchema).optional()
}).strict();

export const PlayerCreateManyTeamInputSchema: z.ZodType<Prisma.PlayerCreateManyTeamInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TeamTournamentCreateManyTeamInputSchema: z.ZodType<Prisma.TeamTournamentCreateManyTeamInput> = z.object({
  id: z.string().cuid().optional(),
  tournamentId: z.string(),
  seed: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const MatchCreateManyTeamAInputSchema: z.ZodType<Prisma.MatchCreateManyTeamAInput> = z.object({
  id: z.string().cuid().optional(),
  matchNumber: z.number().int().optional().nullable(),
  teamBId: z.string().optional().nullable(),
  scoreTeamA: z.number().int().optional().nullable(),
  scoreTeamB: z.number().int().optional().nullable(),
  winnerId: z.string().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  location: z.string().optional().nullable(),
  status: z.lazy(() => MatchStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const MatchCreateManyTeamBInputSchema: z.ZodType<Prisma.MatchCreateManyTeamBInput> = z.object({
  id: z.string().cuid().optional(),
  matchNumber: z.number().int().optional().nullable(),
  teamAId: z.string().optional().nullable(),
  scoreTeamA: z.number().int().optional().nullable(),
  scoreTeamB: z.number().int().optional().nullable(),
  winnerId: z.string().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  location: z.string().optional().nullable(),
  status: z.lazy(() => MatchStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const MatchCreateManyWinnerInputSchema: z.ZodType<Prisma.MatchCreateManyWinnerInput> = z.object({
  id: z.string().cuid().optional(),
  matchNumber: z.number().int().optional().nullable(),
  teamAId: z.string().optional().nullable(),
  teamBId: z.string().optional().nullable(),
  scoreTeamA: z.number().int().optional().nullable(),
  scoreTeamB: z.number().int().optional().nullable(),
  startTime: z.coerce.date().optional().nullable(),
  endTime: z.coerce.date().optional().nullable(),
  location: z.string().optional().nullable(),
  status: z.lazy(() => MatchStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RoundTeamCreateManyTeamInputSchema: z.ZodType<Prisma.RoundTeamCreateManyTeamInput> = z.object({
  id: z.string().cuid().optional(),
  roundId: z.string()
}).strict();

export const PlayerUpdateWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUpdateWithoutTeamInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlayerUncheckedUpdateWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUncheckedUpdateWithoutTeamInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlayerUncheckedUpdateManyWithoutTeamInputSchema: z.ZodType<Prisma.PlayerUncheckedUpdateManyWithoutTeamInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TeamTournamentUpdateWithoutTeamInputSchema: z.ZodType<Prisma.TeamTournamentUpdateWithoutTeamInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seed: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tournament: z.lazy(() => TournamentUpdateOneRequiredWithoutTeamsNestedInputSchema).optional()
}).strict();

export const TeamTournamentUncheckedUpdateWithoutTeamInputSchema: z.ZodType<Prisma.TeamTournamentUncheckedUpdateWithoutTeamInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seed: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TeamTournamentUncheckedUpdateManyWithoutTeamInputSchema: z.ZodType<Prisma.TeamTournamentUncheckedUpdateManyWithoutTeamInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tournamentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seed: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MatchUpdateWithoutTeamAInputSchema: z.ZodType<Prisma.MatchUpdateWithoutTeamAInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  matchNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamA: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamB: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MatchStatusSchema),z.lazy(() => EnumMatchStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  teamB: z.lazy(() => TeamUpdateOneWithoutMatchesTeamBNestedInputSchema).optional(),
  winner: z.lazy(() => TeamUpdateOneWithoutWonMatchesNestedInputSchema).optional(),
  round: z.lazy(() => MatchRoundUpdateOneWithoutMatchNestedInputSchema).optional()
}).strict();

export const MatchUncheckedUpdateWithoutTeamAInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateWithoutTeamAInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  matchNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  teamBId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamA: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamB: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  winnerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MatchStatusSchema),z.lazy(() => EnumMatchStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  round: z.lazy(() => MatchRoundUncheckedUpdateOneWithoutMatchNestedInputSchema).optional()
}).strict();

export const MatchUncheckedUpdateManyWithoutTeamAInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyWithoutTeamAInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  matchNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  teamBId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamA: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamB: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  winnerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MatchStatusSchema),z.lazy(() => EnumMatchStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MatchUpdateWithoutTeamBInputSchema: z.ZodType<Prisma.MatchUpdateWithoutTeamBInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  matchNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamA: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamB: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MatchStatusSchema),z.lazy(() => EnumMatchStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  teamA: z.lazy(() => TeamUpdateOneWithoutMatchesTeamANestedInputSchema).optional(),
  winner: z.lazy(() => TeamUpdateOneWithoutWonMatchesNestedInputSchema).optional(),
  round: z.lazy(() => MatchRoundUpdateOneWithoutMatchNestedInputSchema).optional()
}).strict();

export const MatchUncheckedUpdateWithoutTeamBInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateWithoutTeamBInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  matchNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  teamAId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamA: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamB: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  winnerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MatchStatusSchema),z.lazy(() => EnumMatchStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  round: z.lazy(() => MatchRoundUncheckedUpdateOneWithoutMatchNestedInputSchema).optional()
}).strict();

export const MatchUncheckedUpdateManyWithoutTeamBInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyWithoutTeamBInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  matchNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  teamAId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamA: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamB: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  winnerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MatchStatusSchema),z.lazy(() => EnumMatchStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MatchUpdateWithoutWinnerInputSchema: z.ZodType<Prisma.MatchUpdateWithoutWinnerInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  matchNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamA: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamB: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MatchStatusSchema),z.lazy(() => EnumMatchStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  teamA: z.lazy(() => TeamUpdateOneWithoutMatchesTeamANestedInputSchema).optional(),
  teamB: z.lazy(() => TeamUpdateOneWithoutMatchesTeamBNestedInputSchema).optional(),
  round: z.lazy(() => MatchRoundUpdateOneWithoutMatchNestedInputSchema).optional()
}).strict();

export const MatchUncheckedUpdateWithoutWinnerInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateWithoutWinnerInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  matchNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  teamAId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  teamBId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamA: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamB: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MatchStatusSchema),z.lazy(() => EnumMatchStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  round: z.lazy(() => MatchRoundUncheckedUpdateOneWithoutMatchNestedInputSchema).optional()
}).strict();

export const MatchUncheckedUpdateManyWithoutWinnerInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyWithoutWinnerInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  matchNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  teamAId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  teamBId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamA: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scoreTeamB: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => MatchStatusSchema),z.lazy(() => EnumMatchStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoundTeamUpdateWithoutTeamInputSchema: z.ZodType<Prisma.RoundTeamUpdateWithoutTeamInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  round: z.lazy(() => RoundUpdateOneRequiredWithoutRoundTeamNestedInputSchema).optional()
}).strict();

export const RoundTeamUncheckedUpdateWithoutTeamInputSchema: z.ZodType<Prisma.RoundTeamUncheckedUpdateWithoutTeamInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  roundId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoundTeamUncheckedUpdateManyWithoutTeamInputSchema: z.ZodType<Prisma.RoundTeamUncheckedUpdateManyWithoutTeamInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  roundId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TournamentCreateManyEventInputSchema: z.ZodType<Prisma.TournamentCreateManyEventInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TournamentUpdateWithoutEventInputSchema: z.ZodType<Prisma.TournamentUpdateWithoutEventInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  phases: z.lazy(() => PhaseUpdateManyWithoutTournamentNestedInputSchema).optional(),
  teams: z.lazy(() => TeamTournamentUpdateManyWithoutTournamentNestedInputSchema).optional()
}).strict();

export const TournamentUncheckedUpdateWithoutEventInputSchema: z.ZodType<Prisma.TournamentUncheckedUpdateWithoutEventInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  phases: z.lazy(() => PhaseUncheckedUpdateManyWithoutTournamentNestedInputSchema).optional(),
  teams: z.lazy(() => TeamTournamentUncheckedUpdateManyWithoutTournamentNestedInputSchema).optional()
}).strict();

export const TournamentUncheckedUpdateManyWithoutEventInputSchema: z.ZodType<Prisma.TournamentUncheckedUpdateManyWithoutEventInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PhaseCreateManyTournamentInputSchema: z.ZodType<Prisma.PhaseCreateManyTournamentInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  type: z.lazy(() => PhaseTypeSchema).optional(),
  previousPhaseId: z.string().optional().nullable(),
  nextPhaseId: z.string().optional().nullable()
}).strict();

export const TeamTournamentCreateManyTournamentInputSchema: z.ZodType<Prisma.TeamTournamentCreateManyTournamentInput> = z.object({
  id: z.string().cuid().optional(),
  teamId: z.string(),
  seed: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PhaseUpdateWithoutTournamentInputSchema: z.ZodType<Prisma.PhaseUpdateWithoutTournamentInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PhaseTypeSchema),z.lazy(() => EnumPhaseTypeFieldUpdateOperationsInputSchema) ]).optional(),
  rounds: z.lazy(() => RoundUpdateManyWithoutPhaseNestedInputSchema).optional(),
  previousPhase: z.lazy(() => PhaseUpdateOneWithoutNextPhaseRelationNestedInputSchema).optional(),
  nextPhaseRelation: z.lazy(() => PhaseUpdateOneWithoutPreviousPhaseNestedInputSchema).optional(),
  nextPhase: z.lazy(() => PhaseUpdateOneWithoutPreviousPhaseRelationNestedInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseUpdateOneWithoutNextPhaseNestedInputSchema).optional()
}).strict();

export const PhaseUncheckedUpdateWithoutTournamentInputSchema: z.ZodType<Prisma.PhaseUncheckedUpdateWithoutTournamentInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PhaseTypeSchema),z.lazy(() => EnumPhaseTypeFieldUpdateOperationsInputSchema) ]).optional(),
  previousPhaseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextPhaseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rounds: z.lazy(() => RoundUncheckedUpdateManyWithoutPhaseNestedInputSchema).optional(),
  nextPhaseRelation: z.lazy(() => PhaseUncheckedUpdateOneWithoutPreviousPhaseNestedInputSchema).optional(),
  PreviousPhaseRelation: z.lazy(() => PhaseUncheckedUpdateOneWithoutNextPhaseNestedInputSchema).optional()
}).strict();

export const PhaseUncheckedUpdateManyWithoutTournamentInputSchema: z.ZodType<Prisma.PhaseUncheckedUpdateManyWithoutTournamentInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => PhaseTypeSchema),z.lazy(() => EnumPhaseTypeFieldUpdateOperationsInputSchema) ]).optional(),
  previousPhaseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  nextPhaseId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TeamTournamentUpdateWithoutTournamentInputSchema: z.ZodType<Prisma.TeamTournamentUpdateWithoutTournamentInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seed: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  team: z.lazy(() => TeamUpdateOneRequiredWithoutTeamInTournamentsNestedInputSchema).optional()
}).strict();

export const TeamTournamentUncheckedUpdateWithoutTournamentInputSchema: z.ZodType<Prisma.TeamTournamentUncheckedUpdateWithoutTournamentInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teamId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seed: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TeamTournamentUncheckedUpdateManyWithoutTournamentInputSchema: z.ZodType<Prisma.TeamTournamentUncheckedUpdateManyWithoutTournamentInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teamId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  seed: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoundCreateManyPhaseInputSchema: z.ZodType<Prisma.RoundCreateManyPhaseInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional().nullable(),
  roundNumber: z.number().int().optional().nullable()
}).strict();

export const RoundUpdateWithoutPhaseInputSchema: z.ZodType<Prisma.RoundUpdateWithoutPhaseInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roundNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  matches: z.lazy(() => MatchRoundUpdateManyWithoutRoundNestedInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUpdateManyWithoutRoundNestedInputSchema).optional()
}).strict();

export const RoundUncheckedUpdateWithoutPhaseInputSchema: z.ZodType<Prisma.RoundUncheckedUpdateWithoutPhaseInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roundNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  matches: z.lazy(() => MatchRoundUncheckedUpdateManyWithoutRoundNestedInputSchema).optional(),
  roundTeam: z.lazy(() => RoundTeamUncheckedUpdateManyWithoutRoundNestedInputSchema).optional()
}).strict();

export const RoundUncheckedUpdateManyWithoutPhaseInputSchema: z.ZodType<Prisma.RoundUncheckedUpdateManyWithoutPhaseInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  roundNumber: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MatchRoundCreateManyRoundInputSchema: z.ZodType<Prisma.MatchRoundCreateManyRoundInput> = z.object({
  id: z.string().cuid().optional(),
  numRoundMatch: z.number().int(),
  matchId: z.string()
}).strict();

export const RoundTeamCreateManyRoundInputSchema: z.ZodType<Prisma.RoundTeamCreateManyRoundInput> = z.object({
  id: z.string().cuid().optional(),
  teamId: z.string()
}).strict();

export const MatchRoundUpdateWithoutRoundInputSchema: z.ZodType<Prisma.MatchRoundUpdateWithoutRoundInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  numRoundMatch: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  match: z.lazy(() => MatchUpdateOneRequiredWithoutRoundNestedInputSchema).optional()
}).strict();

export const MatchRoundUncheckedUpdateWithoutRoundInputSchema: z.ZodType<Prisma.MatchRoundUncheckedUpdateWithoutRoundInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  numRoundMatch: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  matchId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MatchRoundUncheckedUpdateManyWithoutRoundInputSchema: z.ZodType<Prisma.MatchRoundUncheckedUpdateManyWithoutRoundInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  numRoundMatch: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  matchId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoundTeamUpdateWithoutRoundInputSchema: z.ZodType<Prisma.RoundTeamUpdateWithoutRoundInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  team: z.lazy(() => TeamUpdateOneRequiredWithoutRoundTeamNestedInputSchema).optional()
}).strict();

export const RoundTeamUncheckedUpdateWithoutRoundInputSchema: z.ZodType<Prisma.RoundTeamUncheckedUpdateWithoutRoundInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teamId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoundTeamUncheckedUpdateManyWithoutRoundInputSchema: z.ZodType<Prisma.RoundTeamUncheckedUpdateManyWithoutRoundInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teamId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const MatchFindFirstArgsSchema: z.ZodType<Prisma.MatchFindFirstArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  where: MatchWhereInputSchema.optional(),
  orderBy: z.union([ MatchOrderByWithRelationInputSchema.array(),MatchOrderByWithRelationInputSchema ]).optional(),
  cursor: MatchWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MatchScalarFieldEnumSchema,MatchScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MatchFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MatchFindFirstOrThrowArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  where: MatchWhereInputSchema.optional(),
  orderBy: z.union([ MatchOrderByWithRelationInputSchema.array(),MatchOrderByWithRelationInputSchema ]).optional(),
  cursor: MatchWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MatchScalarFieldEnumSchema,MatchScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MatchFindManyArgsSchema: z.ZodType<Prisma.MatchFindManyArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  where: MatchWhereInputSchema.optional(),
  orderBy: z.union([ MatchOrderByWithRelationInputSchema.array(),MatchOrderByWithRelationInputSchema ]).optional(),
  cursor: MatchWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MatchScalarFieldEnumSchema,MatchScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MatchAggregateArgsSchema: z.ZodType<Prisma.MatchAggregateArgs> = z.object({
  where: MatchWhereInputSchema.optional(),
  orderBy: z.union([ MatchOrderByWithRelationInputSchema.array(),MatchOrderByWithRelationInputSchema ]).optional(),
  cursor: MatchWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MatchGroupByArgsSchema: z.ZodType<Prisma.MatchGroupByArgs> = z.object({
  where: MatchWhereInputSchema.optional(),
  orderBy: z.union([ MatchOrderByWithAggregationInputSchema.array(),MatchOrderByWithAggregationInputSchema ]).optional(),
  by: MatchScalarFieldEnumSchema.array(),
  having: MatchScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MatchFindUniqueArgsSchema: z.ZodType<Prisma.MatchFindUniqueArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  where: MatchWhereUniqueInputSchema,
}).strict() ;

export const MatchFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MatchFindUniqueOrThrowArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  where: MatchWhereUniqueInputSchema,
}).strict() ;

export const TeamFindFirstArgsSchema: z.ZodType<Prisma.TeamFindFirstArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereInputSchema.optional(),
  orderBy: z.union([ TeamOrderByWithRelationInputSchema.array(),TeamOrderByWithRelationInputSchema ]).optional(),
  cursor: TeamWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TeamScalarFieldEnumSchema,TeamScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TeamFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TeamFindFirstOrThrowArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereInputSchema.optional(),
  orderBy: z.union([ TeamOrderByWithRelationInputSchema.array(),TeamOrderByWithRelationInputSchema ]).optional(),
  cursor: TeamWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TeamScalarFieldEnumSchema,TeamScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TeamFindManyArgsSchema: z.ZodType<Prisma.TeamFindManyArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereInputSchema.optional(),
  orderBy: z.union([ TeamOrderByWithRelationInputSchema.array(),TeamOrderByWithRelationInputSchema ]).optional(),
  cursor: TeamWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TeamScalarFieldEnumSchema,TeamScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TeamAggregateArgsSchema: z.ZodType<Prisma.TeamAggregateArgs> = z.object({
  where: TeamWhereInputSchema.optional(),
  orderBy: z.union([ TeamOrderByWithRelationInputSchema.array(),TeamOrderByWithRelationInputSchema ]).optional(),
  cursor: TeamWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TeamGroupByArgsSchema: z.ZodType<Prisma.TeamGroupByArgs> = z.object({
  where: TeamWhereInputSchema.optional(),
  orderBy: z.union([ TeamOrderByWithAggregationInputSchema.array(),TeamOrderByWithAggregationInputSchema ]).optional(),
  by: TeamScalarFieldEnumSchema.array(),
  having: TeamScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TeamFindUniqueArgsSchema: z.ZodType<Prisma.TeamFindUniqueArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereUniqueInputSchema,
}).strict() ;

export const TeamFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TeamFindUniqueOrThrowArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereUniqueInputSchema,
}).strict() ;

export const PlayerFindFirstArgsSchema: z.ZodType<Prisma.PlayerFindFirstArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  where: PlayerWhereInputSchema.optional(),
  orderBy: z.union([ PlayerOrderByWithRelationInputSchema.array(),PlayerOrderByWithRelationInputSchema ]).optional(),
  cursor: PlayerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlayerScalarFieldEnumSchema,PlayerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlayerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PlayerFindFirstOrThrowArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  where: PlayerWhereInputSchema.optional(),
  orderBy: z.union([ PlayerOrderByWithRelationInputSchema.array(),PlayerOrderByWithRelationInputSchema ]).optional(),
  cursor: PlayerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlayerScalarFieldEnumSchema,PlayerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlayerFindManyArgsSchema: z.ZodType<Prisma.PlayerFindManyArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  where: PlayerWhereInputSchema.optional(),
  orderBy: z.union([ PlayerOrderByWithRelationInputSchema.array(),PlayerOrderByWithRelationInputSchema ]).optional(),
  cursor: PlayerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlayerScalarFieldEnumSchema,PlayerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlayerAggregateArgsSchema: z.ZodType<Prisma.PlayerAggregateArgs> = z.object({
  where: PlayerWhereInputSchema.optional(),
  orderBy: z.union([ PlayerOrderByWithRelationInputSchema.array(),PlayerOrderByWithRelationInputSchema ]).optional(),
  cursor: PlayerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PlayerGroupByArgsSchema: z.ZodType<Prisma.PlayerGroupByArgs> = z.object({
  where: PlayerWhereInputSchema.optional(),
  orderBy: z.union([ PlayerOrderByWithAggregationInputSchema.array(),PlayerOrderByWithAggregationInputSchema ]).optional(),
  by: PlayerScalarFieldEnumSchema.array(),
  having: PlayerScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PlayerFindUniqueArgsSchema: z.ZodType<Prisma.PlayerFindUniqueArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  where: PlayerWhereUniqueInputSchema,
}).strict() ;

export const PlayerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PlayerFindUniqueOrThrowArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  where: PlayerWhereUniqueInputSchema,
}).strict() ;

export const EventFindFirstArgsSchema: z.ZodType<Prisma.EventFindFirstArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EventFindFirstOrThrowArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventFindManyArgsSchema: z.ZodType<Prisma.EventFindManyArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EventScalarFieldEnumSchema,EventScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const EventAggregateArgsSchema: z.ZodType<Prisma.EventAggregateArgs> = z.object({
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithRelationInputSchema.array(),EventOrderByWithRelationInputSchema ]).optional(),
  cursor: EventWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventGroupByArgsSchema: z.ZodType<Prisma.EventGroupByArgs> = z.object({
  where: EventWhereInputSchema.optional(),
  orderBy: z.union([ EventOrderByWithAggregationInputSchema.array(),EventOrderByWithAggregationInputSchema ]).optional(),
  by: EventScalarFieldEnumSchema.array(),
  having: EventScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const EventFindUniqueArgsSchema: z.ZodType<Prisma.EventFindUniqueArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EventFindUniqueOrThrowArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const TournamentFindFirstArgsSchema: z.ZodType<Prisma.TournamentFindFirstArgs> = z.object({
  select: TournamentSelectSchema.optional(),
  include: TournamentIncludeSchema.optional(),
  where: TournamentWhereInputSchema.optional(),
  orderBy: z.union([ TournamentOrderByWithRelationInputSchema.array(),TournamentOrderByWithRelationInputSchema ]).optional(),
  cursor: TournamentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TournamentScalarFieldEnumSchema,TournamentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TournamentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TournamentFindFirstOrThrowArgs> = z.object({
  select: TournamentSelectSchema.optional(),
  include: TournamentIncludeSchema.optional(),
  where: TournamentWhereInputSchema.optional(),
  orderBy: z.union([ TournamentOrderByWithRelationInputSchema.array(),TournamentOrderByWithRelationInputSchema ]).optional(),
  cursor: TournamentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TournamentScalarFieldEnumSchema,TournamentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TournamentFindManyArgsSchema: z.ZodType<Prisma.TournamentFindManyArgs> = z.object({
  select: TournamentSelectSchema.optional(),
  include: TournamentIncludeSchema.optional(),
  where: TournamentWhereInputSchema.optional(),
  orderBy: z.union([ TournamentOrderByWithRelationInputSchema.array(),TournamentOrderByWithRelationInputSchema ]).optional(),
  cursor: TournamentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TournamentScalarFieldEnumSchema,TournamentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TournamentAggregateArgsSchema: z.ZodType<Prisma.TournamentAggregateArgs> = z.object({
  where: TournamentWhereInputSchema.optional(),
  orderBy: z.union([ TournamentOrderByWithRelationInputSchema.array(),TournamentOrderByWithRelationInputSchema ]).optional(),
  cursor: TournamentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TournamentGroupByArgsSchema: z.ZodType<Prisma.TournamentGroupByArgs> = z.object({
  where: TournamentWhereInputSchema.optional(),
  orderBy: z.union([ TournamentOrderByWithAggregationInputSchema.array(),TournamentOrderByWithAggregationInputSchema ]).optional(),
  by: TournamentScalarFieldEnumSchema.array(),
  having: TournamentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TournamentFindUniqueArgsSchema: z.ZodType<Prisma.TournamentFindUniqueArgs> = z.object({
  select: TournamentSelectSchema.optional(),
  include: TournamentIncludeSchema.optional(),
  where: TournamentWhereUniqueInputSchema,
}).strict() ;

export const TournamentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TournamentFindUniqueOrThrowArgs> = z.object({
  select: TournamentSelectSchema.optional(),
  include: TournamentIncludeSchema.optional(),
  where: TournamentWhereUniqueInputSchema,
}).strict() ;

export const TeamTournamentFindFirstArgsSchema: z.ZodType<Prisma.TeamTournamentFindFirstArgs> = z.object({
  select: TeamTournamentSelectSchema.optional(),
  include: TeamTournamentIncludeSchema.optional(),
  where: TeamTournamentWhereInputSchema.optional(),
  orderBy: z.union([ TeamTournamentOrderByWithRelationInputSchema.array(),TeamTournamentOrderByWithRelationInputSchema ]).optional(),
  cursor: TeamTournamentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TeamTournamentScalarFieldEnumSchema,TeamTournamentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TeamTournamentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TeamTournamentFindFirstOrThrowArgs> = z.object({
  select: TeamTournamentSelectSchema.optional(),
  include: TeamTournamentIncludeSchema.optional(),
  where: TeamTournamentWhereInputSchema.optional(),
  orderBy: z.union([ TeamTournamentOrderByWithRelationInputSchema.array(),TeamTournamentOrderByWithRelationInputSchema ]).optional(),
  cursor: TeamTournamentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TeamTournamentScalarFieldEnumSchema,TeamTournamentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TeamTournamentFindManyArgsSchema: z.ZodType<Prisma.TeamTournamentFindManyArgs> = z.object({
  select: TeamTournamentSelectSchema.optional(),
  include: TeamTournamentIncludeSchema.optional(),
  where: TeamTournamentWhereInputSchema.optional(),
  orderBy: z.union([ TeamTournamentOrderByWithRelationInputSchema.array(),TeamTournamentOrderByWithRelationInputSchema ]).optional(),
  cursor: TeamTournamentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TeamTournamentScalarFieldEnumSchema,TeamTournamentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TeamTournamentAggregateArgsSchema: z.ZodType<Prisma.TeamTournamentAggregateArgs> = z.object({
  where: TeamTournamentWhereInputSchema.optional(),
  orderBy: z.union([ TeamTournamentOrderByWithRelationInputSchema.array(),TeamTournamentOrderByWithRelationInputSchema ]).optional(),
  cursor: TeamTournamentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TeamTournamentGroupByArgsSchema: z.ZodType<Prisma.TeamTournamentGroupByArgs> = z.object({
  where: TeamTournamentWhereInputSchema.optional(),
  orderBy: z.union([ TeamTournamentOrderByWithAggregationInputSchema.array(),TeamTournamentOrderByWithAggregationInputSchema ]).optional(),
  by: TeamTournamentScalarFieldEnumSchema.array(),
  having: TeamTournamentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TeamTournamentFindUniqueArgsSchema: z.ZodType<Prisma.TeamTournamentFindUniqueArgs> = z.object({
  select: TeamTournamentSelectSchema.optional(),
  include: TeamTournamentIncludeSchema.optional(),
  where: TeamTournamentWhereUniqueInputSchema,
}).strict() ;

export const TeamTournamentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TeamTournamentFindUniqueOrThrowArgs> = z.object({
  select: TeamTournamentSelectSchema.optional(),
  include: TeamTournamentIncludeSchema.optional(),
  where: TeamTournamentWhereUniqueInputSchema,
}).strict() ;

export const PhaseFindFirstArgsSchema: z.ZodType<Prisma.PhaseFindFirstArgs> = z.object({
  select: PhaseSelectSchema.optional(),
  include: PhaseIncludeSchema.optional(),
  where: PhaseWhereInputSchema.optional(),
  orderBy: z.union([ PhaseOrderByWithRelationInputSchema.array(),PhaseOrderByWithRelationInputSchema ]).optional(),
  cursor: PhaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PhaseScalarFieldEnumSchema,PhaseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PhaseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PhaseFindFirstOrThrowArgs> = z.object({
  select: PhaseSelectSchema.optional(),
  include: PhaseIncludeSchema.optional(),
  where: PhaseWhereInputSchema.optional(),
  orderBy: z.union([ PhaseOrderByWithRelationInputSchema.array(),PhaseOrderByWithRelationInputSchema ]).optional(),
  cursor: PhaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PhaseScalarFieldEnumSchema,PhaseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PhaseFindManyArgsSchema: z.ZodType<Prisma.PhaseFindManyArgs> = z.object({
  select: PhaseSelectSchema.optional(),
  include: PhaseIncludeSchema.optional(),
  where: PhaseWhereInputSchema.optional(),
  orderBy: z.union([ PhaseOrderByWithRelationInputSchema.array(),PhaseOrderByWithRelationInputSchema ]).optional(),
  cursor: PhaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PhaseScalarFieldEnumSchema,PhaseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PhaseAggregateArgsSchema: z.ZodType<Prisma.PhaseAggregateArgs> = z.object({
  where: PhaseWhereInputSchema.optional(),
  orderBy: z.union([ PhaseOrderByWithRelationInputSchema.array(),PhaseOrderByWithRelationInputSchema ]).optional(),
  cursor: PhaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PhaseGroupByArgsSchema: z.ZodType<Prisma.PhaseGroupByArgs> = z.object({
  where: PhaseWhereInputSchema.optional(),
  orderBy: z.union([ PhaseOrderByWithAggregationInputSchema.array(),PhaseOrderByWithAggregationInputSchema ]).optional(),
  by: PhaseScalarFieldEnumSchema.array(),
  having: PhaseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PhaseFindUniqueArgsSchema: z.ZodType<Prisma.PhaseFindUniqueArgs> = z.object({
  select: PhaseSelectSchema.optional(),
  include: PhaseIncludeSchema.optional(),
  where: PhaseWhereUniqueInputSchema,
}).strict() ;

export const PhaseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PhaseFindUniqueOrThrowArgs> = z.object({
  select: PhaseSelectSchema.optional(),
  include: PhaseIncludeSchema.optional(),
  where: PhaseWhereUniqueInputSchema,
}).strict() ;

export const RoundFindFirstArgsSchema: z.ZodType<Prisma.RoundFindFirstArgs> = z.object({
  select: RoundSelectSchema.optional(),
  include: RoundIncludeSchema.optional(),
  where: RoundWhereInputSchema.optional(),
  orderBy: z.union([ RoundOrderByWithRelationInputSchema.array(),RoundOrderByWithRelationInputSchema ]).optional(),
  cursor: RoundWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoundScalarFieldEnumSchema,RoundScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoundFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RoundFindFirstOrThrowArgs> = z.object({
  select: RoundSelectSchema.optional(),
  include: RoundIncludeSchema.optional(),
  where: RoundWhereInputSchema.optional(),
  orderBy: z.union([ RoundOrderByWithRelationInputSchema.array(),RoundOrderByWithRelationInputSchema ]).optional(),
  cursor: RoundWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoundScalarFieldEnumSchema,RoundScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoundFindManyArgsSchema: z.ZodType<Prisma.RoundFindManyArgs> = z.object({
  select: RoundSelectSchema.optional(),
  include: RoundIncludeSchema.optional(),
  where: RoundWhereInputSchema.optional(),
  orderBy: z.union([ RoundOrderByWithRelationInputSchema.array(),RoundOrderByWithRelationInputSchema ]).optional(),
  cursor: RoundWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoundScalarFieldEnumSchema,RoundScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoundAggregateArgsSchema: z.ZodType<Prisma.RoundAggregateArgs> = z.object({
  where: RoundWhereInputSchema.optional(),
  orderBy: z.union([ RoundOrderByWithRelationInputSchema.array(),RoundOrderByWithRelationInputSchema ]).optional(),
  cursor: RoundWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RoundGroupByArgsSchema: z.ZodType<Prisma.RoundGroupByArgs> = z.object({
  where: RoundWhereInputSchema.optional(),
  orderBy: z.union([ RoundOrderByWithAggregationInputSchema.array(),RoundOrderByWithAggregationInputSchema ]).optional(),
  by: RoundScalarFieldEnumSchema.array(),
  having: RoundScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RoundFindUniqueArgsSchema: z.ZodType<Prisma.RoundFindUniqueArgs> = z.object({
  select: RoundSelectSchema.optional(),
  include: RoundIncludeSchema.optional(),
  where: RoundWhereUniqueInputSchema,
}).strict() ;

export const RoundFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RoundFindUniqueOrThrowArgs> = z.object({
  select: RoundSelectSchema.optional(),
  include: RoundIncludeSchema.optional(),
  where: RoundWhereUniqueInputSchema,
}).strict() ;

export const MatchRoundFindFirstArgsSchema: z.ZodType<Prisma.MatchRoundFindFirstArgs> = z.object({
  select: MatchRoundSelectSchema.optional(),
  include: MatchRoundIncludeSchema.optional(),
  where: MatchRoundWhereInputSchema.optional(),
  orderBy: z.union([ MatchRoundOrderByWithRelationInputSchema.array(),MatchRoundOrderByWithRelationInputSchema ]).optional(),
  cursor: MatchRoundWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MatchRoundScalarFieldEnumSchema,MatchRoundScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MatchRoundFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MatchRoundFindFirstOrThrowArgs> = z.object({
  select: MatchRoundSelectSchema.optional(),
  include: MatchRoundIncludeSchema.optional(),
  where: MatchRoundWhereInputSchema.optional(),
  orderBy: z.union([ MatchRoundOrderByWithRelationInputSchema.array(),MatchRoundOrderByWithRelationInputSchema ]).optional(),
  cursor: MatchRoundWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MatchRoundScalarFieldEnumSchema,MatchRoundScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MatchRoundFindManyArgsSchema: z.ZodType<Prisma.MatchRoundFindManyArgs> = z.object({
  select: MatchRoundSelectSchema.optional(),
  include: MatchRoundIncludeSchema.optional(),
  where: MatchRoundWhereInputSchema.optional(),
  orderBy: z.union([ MatchRoundOrderByWithRelationInputSchema.array(),MatchRoundOrderByWithRelationInputSchema ]).optional(),
  cursor: MatchRoundWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MatchRoundScalarFieldEnumSchema,MatchRoundScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MatchRoundAggregateArgsSchema: z.ZodType<Prisma.MatchRoundAggregateArgs> = z.object({
  where: MatchRoundWhereInputSchema.optional(),
  orderBy: z.union([ MatchRoundOrderByWithRelationInputSchema.array(),MatchRoundOrderByWithRelationInputSchema ]).optional(),
  cursor: MatchRoundWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MatchRoundGroupByArgsSchema: z.ZodType<Prisma.MatchRoundGroupByArgs> = z.object({
  where: MatchRoundWhereInputSchema.optional(),
  orderBy: z.union([ MatchRoundOrderByWithAggregationInputSchema.array(),MatchRoundOrderByWithAggregationInputSchema ]).optional(),
  by: MatchRoundScalarFieldEnumSchema.array(),
  having: MatchRoundScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MatchRoundFindUniqueArgsSchema: z.ZodType<Prisma.MatchRoundFindUniqueArgs> = z.object({
  select: MatchRoundSelectSchema.optional(),
  include: MatchRoundIncludeSchema.optional(),
  where: MatchRoundWhereUniqueInputSchema,
}).strict() ;

export const MatchRoundFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MatchRoundFindUniqueOrThrowArgs> = z.object({
  select: MatchRoundSelectSchema.optional(),
  include: MatchRoundIncludeSchema.optional(),
  where: MatchRoundWhereUniqueInputSchema,
}).strict() ;

export const RoundTeamFindFirstArgsSchema: z.ZodType<Prisma.RoundTeamFindFirstArgs> = z.object({
  select: RoundTeamSelectSchema.optional(),
  include: RoundTeamIncludeSchema.optional(),
  where: RoundTeamWhereInputSchema.optional(),
  orderBy: z.union([ RoundTeamOrderByWithRelationInputSchema.array(),RoundTeamOrderByWithRelationInputSchema ]).optional(),
  cursor: RoundTeamWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoundTeamScalarFieldEnumSchema,RoundTeamScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoundTeamFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RoundTeamFindFirstOrThrowArgs> = z.object({
  select: RoundTeamSelectSchema.optional(),
  include: RoundTeamIncludeSchema.optional(),
  where: RoundTeamWhereInputSchema.optional(),
  orderBy: z.union([ RoundTeamOrderByWithRelationInputSchema.array(),RoundTeamOrderByWithRelationInputSchema ]).optional(),
  cursor: RoundTeamWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoundTeamScalarFieldEnumSchema,RoundTeamScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoundTeamFindManyArgsSchema: z.ZodType<Prisma.RoundTeamFindManyArgs> = z.object({
  select: RoundTeamSelectSchema.optional(),
  include: RoundTeamIncludeSchema.optional(),
  where: RoundTeamWhereInputSchema.optional(),
  orderBy: z.union([ RoundTeamOrderByWithRelationInputSchema.array(),RoundTeamOrderByWithRelationInputSchema ]).optional(),
  cursor: RoundTeamWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoundTeamScalarFieldEnumSchema,RoundTeamScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoundTeamAggregateArgsSchema: z.ZodType<Prisma.RoundTeamAggregateArgs> = z.object({
  where: RoundTeamWhereInputSchema.optional(),
  orderBy: z.union([ RoundTeamOrderByWithRelationInputSchema.array(),RoundTeamOrderByWithRelationInputSchema ]).optional(),
  cursor: RoundTeamWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RoundTeamGroupByArgsSchema: z.ZodType<Prisma.RoundTeamGroupByArgs> = z.object({
  where: RoundTeamWhereInputSchema.optional(),
  orderBy: z.union([ RoundTeamOrderByWithAggregationInputSchema.array(),RoundTeamOrderByWithAggregationInputSchema ]).optional(),
  by: RoundTeamScalarFieldEnumSchema.array(),
  having: RoundTeamScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RoundTeamFindUniqueArgsSchema: z.ZodType<Prisma.RoundTeamFindUniqueArgs> = z.object({
  select: RoundTeamSelectSchema.optional(),
  include: RoundTeamIncludeSchema.optional(),
  where: RoundTeamWhereUniqueInputSchema,
}).strict() ;

export const RoundTeamFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RoundTeamFindUniqueOrThrowArgs> = z.object({
  select: RoundTeamSelectSchema.optional(),
  include: RoundTeamIncludeSchema.optional(),
  where: RoundTeamWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const MatchCreateArgsSchema: z.ZodType<Prisma.MatchCreateArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  data: z.union([ MatchCreateInputSchema,MatchUncheckedCreateInputSchema ]),
}).strict() ;

export const MatchUpsertArgsSchema: z.ZodType<Prisma.MatchUpsertArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  where: MatchWhereUniqueInputSchema,
  create: z.union([ MatchCreateInputSchema,MatchUncheckedCreateInputSchema ]),
  update: z.union([ MatchUpdateInputSchema,MatchUncheckedUpdateInputSchema ]),
}).strict() ;

export const MatchCreateManyArgsSchema: z.ZodType<Prisma.MatchCreateManyArgs> = z.object({
  data: z.union([ MatchCreateManyInputSchema,MatchCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MatchCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MatchCreateManyAndReturnArgs> = z.object({
  data: z.union([ MatchCreateManyInputSchema,MatchCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MatchDeleteArgsSchema: z.ZodType<Prisma.MatchDeleteArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  where: MatchWhereUniqueInputSchema,
}).strict() ;

export const MatchUpdateArgsSchema: z.ZodType<Prisma.MatchUpdateArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  data: z.union([ MatchUpdateInputSchema,MatchUncheckedUpdateInputSchema ]),
  where: MatchWhereUniqueInputSchema,
}).strict() ;

export const MatchUpdateManyArgsSchema: z.ZodType<Prisma.MatchUpdateManyArgs> = z.object({
  data: z.union([ MatchUpdateManyMutationInputSchema,MatchUncheckedUpdateManyInputSchema ]),
  where: MatchWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const MatchUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.MatchUpdateManyAndReturnArgs> = z.object({
  data: z.union([ MatchUpdateManyMutationInputSchema,MatchUncheckedUpdateManyInputSchema ]),
  where: MatchWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const MatchDeleteManyArgsSchema: z.ZodType<Prisma.MatchDeleteManyArgs> = z.object({
  where: MatchWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TeamCreateArgsSchema: z.ZodType<Prisma.TeamCreateArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  data: z.union([ TeamCreateInputSchema,TeamUncheckedCreateInputSchema ]),
}).strict() ;

export const TeamUpsertArgsSchema: z.ZodType<Prisma.TeamUpsertArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereUniqueInputSchema,
  create: z.union([ TeamCreateInputSchema,TeamUncheckedCreateInputSchema ]),
  update: z.union([ TeamUpdateInputSchema,TeamUncheckedUpdateInputSchema ]),
}).strict() ;

export const TeamCreateManyArgsSchema: z.ZodType<Prisma.TeamCreateManyArgs> = z.object({
  data: z.union([ TeamCreateManyInputSchema,TeamCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TeamCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TeamCreateManyAndReturnArgs> = z.object({
  data: z.union([ TeamCreateManyInputSchema,TeamCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TeamDeleteArgsSchema: z.ZodType<Prisma.TeamDeleteArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  where: TeamWhereUniqueInputSchema,
}).strict() ;

export const TeamUpdateArgsSchema: z.ZodType<Prisma.TeamUpdateArgs> = z.object({
  select: TeamSelectSchema.optional(),
  include: TeamIncludeSchema.optional(),
  data: z.union([ TeamUpdateInputSchema,TeamUncheckedUpdateInputSchema ]),
  where: TeamWhereUniqueInputSchema,
}).strict() ;

export const TeamUpdateManyArgsSchema: z.ZodType<Prisma.TeamUpdateManyArgs> = z.object({
  data: z.union([ TeamUpdateManyMutationInputSchema,TeamUncheckedUpdateManyInputSchema ]),
  where: TeamWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TeamUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TeamUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TeamUpdateManyMutationInputSchema,TeamUncheckedUpdateManyInputSchema ]),
  where: TeamWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TeamDeleteManyArgsSchema: z.ZodType<Prisma.TeamDeleteManyArgs> = z.object({
  where: TeamWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PlayerCreateArgsSchema: z.ZodType<Prisma.PlayerCreateArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  data: z.union([ PlayerCreateInputSchema,PlayerUncheckedCreateInputSchema ]),
}).strict() ;

export const PlayerUpsertArgsSchema: z.ZodType<Prisma.PlayerUpsertArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  where: PlayerWhereUniqueInputSchema,
  create: z.union([ PlayerCreateInputSchema,PlayerUncheckedCreateInputSchema ]),
  update: z.union([ PlayerUpdateInputSchema,PlayerUncheckedUpdateInputSchema ]),
}).strict() ;

export const PlayerCreateManyArgsSchema: z.ZodType<Prisma.PlayerCreateManyArgs> = z.object({
  data: z.union([ PlayerCreateManyInputSchema,PlayerCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PlayerCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PlayerCreateManyAndReturnArgs> = z.object({
  data: z.union([ PlayerCreateManyInputSchema,PlayerCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PlayerDeleteArgsSchema: z.ZodType<Prisma.PlayerDeleteArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  where: PlayerWhereUniqueInputSchema,
}).strict() ;

export const PlayerUpdateArgsSchema: z.ZodType<Prisma.PlayerUpdateArgs> = z.object({
  select: PlayerSelectSchema.optional(),
  include: PlayerIncludeSchema.optional(),
  data: z.union([ PlayerUpdateInputSchema,PlayerUncheckedUpdateInputSchema ]),
  where: PlayerWhereUniqueInputSchema,
}).strict() ;

export const PlayerUpdateManyArgsSchema: z.ZodType<Prisma.PlayerUpdateManyArgs> = z.object({
  data: z.union([ PlayerUpdateManyMutationInputSchema,PlayerUncheckedUpdateManyInputSchema ]),
  where: PlayerWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PlayerUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PlayerUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PlayerUpdateManyMutationInputSchema,PlayerUncheckedUpdateManyInputSchema ]),
  where: PlayerWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PlayerDeleteManyArgsSchema: z.ZodType<Prisma.PlayerDeleteManyArgs> = z.object({
  where: PlayerWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EventCreateArgsSchema: z.ZodType<Prisma.EventCreateArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  data: z.union([ EventCreateInputSchema,EventUncheckedCreateInputSchema ]),
}).strict() ;

export const EventUpsertArgsSchema: z.ZodType<Prisma.EventUpsertArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
  create: z.union([ EventCreateInputSchema,EventUncheckedCreateInputSchema ]),
  update: z.union([ EventUpdateInputSchema,EventUncheckedUpdateInputSchema ]),
}).strict() ;

export const EventCreateManyArgsSchema: z.ZodType<Prisma.EventCreateManyArgs> = z.object({
  data: z.union([ EventCreateManyInputSchema,EventCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EventCreateManyAndReturnArgsSchema: z.ZodType<Prisma.EventCreateManyAndReturnArgs> = z.object({
  data: z.union([ EventCreateManyInputSchema,EventCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const EventDeleteArgsSchema: z.ZodType<Prisma.EventDeleteArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventUpdateArgsSchema: z.ZodType<Prisma.EventUpdateArgs> = z.object({
  select: EventSelectSchema.optional(),
  include: EventIncludeSchema.optional(),
  data: z.union([ EventUpdateInputSchema,EventUncheckedUpdateInputSchema ]),
  where: EventWhereUniqueInputSchema,
}).strict() ;

export const EventUpdateManyArgsSchema: z.ZodType<Prisma.EventUpdateManyArgs> = z.object({
  data: z.union([ EventUpdateManyMutationInputSchema,EventUncheckedUpdateManyInputSchema ]),
  where: EventWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EventUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.EventUpdateManyAndReturnArgs> = z.object({
  data: z.union([ EventUpdateManyMutationInputSchema,EventUncheckedUpdateManyInputSchema ]),
  where: EventWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const EventDeleteManyArgsSchema: z.ZodType<Prisma.EventDeleteManyArgs> = z.object({
  where: EventWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TournamentCreateArgsSchema: z.ZodType<Prisma.TournamentCreateArgs> = z.object({
  select: TournamentSelectSchema.optional(),
  include: TournamentIncludeSchema.optional(),
  data: z.union([ TournamentCreateInputSchema,TournamentUncheckedCreateInputSchema ]),
}).strict() ;

export const TournamentUpsertArgsSchema: z.ZodType<Prisma.TournamentUpsertArgs> = z.object({
  select: TournamentSelectSchema.optional(),
  include: TournamentIncludeSchema.optional(),
  where: TournamentWhereUniqueInputSchema,
  create: z.union([ TournamentCreateInputSchema,TournamentUncheckedCreateInputSchema ]),
  update: z.union([ TournamentUpdateInputSchema,TournamentUncheckedUpdateInputSchema ]),
}).strict() ;

export const TournamentCreateManyArgsSchema: z.ZodType<Prisma.TournamentCreateManyArgs> = z.object({
  data: z.union([ TournamentCreateManyInputSchema,TournamentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TournamentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TournamentCreateManyAndReturnArgs> = z.object({
  data: z.union([ TournamentCreateManyInputSchema,TournamentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TournamentDeleteArgsSchema: z.ZodType<Prisma.TournamentDeleteArgs> = z.object({
  select: TournamentSelectSchema.optional(),
  include: TournamentIncludeSchema.optional(),
  where: TournamentWhereUniqueInputSchema,
}).strict() ;

export const TournamentUpdateArgsSchema: z.ZodType<Prisma.TournamentUpdateArgs> = z.object({
  select: TournamentSelectSchema.optional(),
  include: TournamentIncludeSchema.optional(),
  data: z.union([ TournamentUpdateInputSchema,TournamentUncheckedUpdateInputSchema ]),
  where: TournamentWhereUniqueInputSchema,
}).strict() ;

export const TournamentUpdateManyArgsSchema: z.ZodType<Prisma.TournamentUpdateManyArgs> = z.object({
  data: z.union([ TournamentUpdateManyMutationInputSchema,TournamentUncheckedUpdateManyInputSchema ]),
  where: TournamentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TournamentUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TournamentUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TournamentUpdateManyMutationInputSchema,TournamentUncheckedUpdateManyInputSchema ]),
  where: TournamentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TournamentDeleteManyArgsSchema: z.ZodType<Prisma.TournamentDeleteManyArgs> = z.object({
  where: TournamentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TeamTournamentCreateArgsSchema: z.ZodType<Prisma.TeamTournamentCreateArgs> = z.object({
  select: TeamTournamentSelectSchema.optional(),
  include: TeamTournamentIncludeSchema.optional(),
  data: z.union([ TeamTournamentCreateInputSchema,TeamTournamentUncheckedCreateInputSchema ]),
}).strict() ;

export const TeamTournamentUpsertArgsSchema: z.ZodType<Prisma.TeamTournamentUpsertArgs> = z.object({
  select: TeamTournamentSelectSchema.optional(),
  include: TeamTournamentIncludeSchema.optional(),
  where: TeamTournamentWhereUniqueInputSchema,
  create: z.union([ TeamTournamentCreateInputSchema,TeamTournamentUncheckedCreateInputSchema ]),
  update: z.union([ TeamTournamentUpdateInputSchema,TeamTournamentUncheckedUpdateInputSchema ]),
}).strict() ;

export const TeamTournamentCreateManyArgsSchema: z.ZodType<Prisma.TeamTournamentCreateManyArgs> = z.object({
  data: z.union([ TeamTournamentCreateManyInputSchema,TeamTournamentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TeamTournamentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TeamTournamentCreateManyAndReturnArgs> = z.object({
  data: z.union([ TeamTournamentCreateManyInputSchema,TeamTournamentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TeamTournamentDeleteArgsSchema: z.ZodType<Prisma.TeamTournamentDeleteArgs> = z.object({
  select: TeamTournamentSelectSchema.optional(),
  include: TeamTournamentIncludeSchema.optional(),
  where: TeamTournamentWhereUniqueInputSchema,
}).strict() ;

export const TeamTournamentUpdateArgsSchema: z.ZodType<Prisma.TeamTournamentUpdateArgs> = z.object({
  select: TeamTournamentSelectSchema.optional(),
  include: TeamTournamentIncludeSchema.optional(),
  data: z.union([ TeamTournamentUpdateInputSchema,TeamTournamentUncheckedUpdateInputSchema ]),
  where: TeamTournamentWhereUniqueInputSchema,
}).strict() ;

export const TeamTournamentUpdateManyArgsSchema: z.ZodType<Prisma.TeamTournamentUpdateManyArgs> = z.object({
  data: z.union([ TeamTournamentUpdateManyMutationInputSchema,TeamTournamentUncheckedUpdateManyInputSchema ]),
  where: TeamTournamentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TeamTournamentUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TeamTournamentUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TeamTournamentUpdateManyMutationInputSchema,TeamTournamentUncheckedUpdateManyInputSchema ]),
  where: TeamTournamentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TeamTournamentDeleteManyArgsSchema: z.ZodType<Prisma.TeamTournamentDeleteManyArgs> = z.object({
  where: TeamTournamentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PhaseCreateArgsSchema: z.ZodType<Prisma.PhaseCreateArgs> = z.object({
  select: PhaseSelectSchema.optional(),
  include: PhaseIncludeSchema.optional(),
  data: z.union([ PhaseCreateInputSchema,PhaseUncheckedCreateInputSchema ]),
}).strict() ;

export const PhaseUpsertArgsSchema: z.ZodType<Prisma.PhaseUpsertArgs> = z.object({
  select: PhaseSelectSchema.optional(),
  include: PhaseIncludeSchema.optional(),
  where: PhaseWhereUniqueInputSchema,
  create: z.union([ PhaseCreateInputSchema,PhaseUncheckedCreateInputSchema ]),
  update: z.union([ PhaseUpdateInputSchema,PhaseUncheckedUpdateInputSchema ]),
}).strict() ;

export const PhaseCreateManyArgsSchema: z.ZodType<Prisma.PhaseCreateManyArgs> = z.object({
  data: z.union([ PhaseCreateManyInputSchema,PhaseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PhaseCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PhaseCreateManyAndReturnArgs> = z.object({
  data: z.union([ PhaseCreateManyInputSchema,PhaseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PhaseDeleteArgsSchema: z.ZodType<Prisma.PhaseDeleteArgs> = z.object({
  select: PhaseSelectSchema.optional(),
  include: PhaseIncludeSchema.optional(),
  where: PhaseWhereUniqueInputSchema,
}).strict() ;

export const PhaseUpdateArgsSchema: z.ZodType<Prisma.PhaseUpdateArgs> = z.object({
  select: PhaseSelectSchema.optional(),
  include: PhaseIncludeSchema.optional(),
  data: z.union([ PhaseUpdateInputSchema,PhaseUncheckedUpdateInputSchema ]),
  where: PhaseWhereUniqueInputSchema,
}).strict() ;

export const PhaseUpdateManyArgsSchema: z.ZodType<Prisma.PhaseUpdateManyArgs> = z.object({
  data: z.union([ PhaseUpdateManyMutationInputSchema,PhaseUncheckedUpdateManyInputSchema ]),
  where: PhaseWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PhaseUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PhaseUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PhaseUpdateManyMutationInputSchema,PhaseUncheckedUpdateManyInputSchema ]),
  where: PhaseWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PhaseDeleteManyArgsSchema: z.ZodType<Prisma.PhaseDeleteManyArgs> = z.object({
  where: PhaseWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RoundCreateArgsSchema: z.ZodType<Prisma.RoundCreateArgs> = z.object({
  select: RoundSelectSchema.optional(),
  include: RoundIncludeSchema.optional(),
  data: z.union([ RoundCreateInputSchema,RoundUncheckedCreateInputSchema ]),
}).strict() ;

export const RoundUpsertArgsSchema: z.ZodType<Prisma.RoundUpsertArgs> = z.object({
  select: RoundSelectSchema.optional(),
  include: RoundIncludeSchema.optional(),
  where: RoundWhereUniqueInputSchema,
  create: z.union([ RoundCreateInputSchema,RoundUncheckedCreateInputSchema ]),
  update: z.union([ RoundUpdateInputSchema,RoundUncheckedUpdateInputSchema ]),
}).strict() ;

export const RoundCreateManyArgsSchema: z.ZodType<Prisma.RoundCreateManyArgs> = z.object({
  data: z.union([ RoundCreateManyInputSchema,RoundCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RoundCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RoundCreateManyAndReturnArgs> = z.object({
  data: z.union([ RoundCreateManyInputSchema,RoundCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RoundDeleteArgsSchema: z.ZodType<Prisma.RoundDeleteArgs> = z.object({
  select: RoundSelectSchema.optional(),
  include: RoundIncludeSchema.optional(),
  where: RoundWhereUniqueInputSchema,
}).strict() ;

export const RoundUpdateArgsSchema: z.ZodType<Prisma.RoundUpdateArgs> = z.object({
  select: RoundSelectSchema.optional(),
  include: RoundIncludeSchema.optional(),
  data: z.union([ RoundUpdateInputSchema,RoundUncheckedUpdateInputSchema ]),
  where: RoundWhereUniqueInputSchema,
}).strict() ;

export const RoundUpdateManyArgsSchema: z.ZodType<Prisma.RoundUpdateManyArgs> = z.object({
  data: z.union([ RoundUpdateManyMutationInputSchema,RoundUncheckedUpdateManyInputSchema ]),
  where: RoundWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RoundUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.RoundUpdateManyAndReturnArgs> = z.object({
  data: z.union([ RoundUpdateManyMutationInputSchema,RoundUncheckedUpdateManyInputSchema ]),
  where: RoundWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RoundDeleteManyArgsSchema: z.ZodType<Prisma.RoundDeleteManyArgs> = z.object({
  where: RoundWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const MatchRoundCreateArgsSchema: z.ZodType<Prisma.MatchRoundCreateArgs> = z.object({
  select: MatchRoundSelectSchema.optional(),
  include: MatchRoundIncludeSchema.optional(),
  data: z.union([ MatchRoundCreateInputSchema,MatchRoundUncheckedCreateInputSchema ]),
}).strict() ;

export const MatchRoundUpsertArgsSchema: z.ZodType<Prisma.MatchRoundUpsertArgs> = z.object({
  select: MatchRoundSelectSchema.optional(),
  include: MatchRoundIncludeSchema.optional(),
  where: MatchRoundWhereUniqueInputSchema,
  create: z.union([ MatchRoundCreateInputSchema,MatchRoundUncheckedCreateInputSchema ]),
  update: z.union([ MatchRoundUpdateInputSchema,MatchRoundUncheckedUpdateInputSchema ]),
}).strict() ;

export const MatchRoundCreateManyArgsSchema: z.ZodType<Prisma.MatchRoundCreateManyArgs> = z.object({
  data: z.union([ MatchRoundCreateManyInputSchema,MatchRoundCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MatchRoundCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MatchRoundCreateManyAndReturnArgs> = z.object({
  data: z.union([ MatchRoundCreateManyInputSchema,MatchRoundCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MatchRoundDeleteArgsSchema: z.ZodType<Prisma.MatchRoundDeleteArgs> = z.object({
  select: MatchRoundSelectSchema.optional(),
  include: MatchRoundIncludeSchema.optional(),
  where: MatchRoundWhereUniqueInputSchema,
}).strict() ;

export const MatchRoundUpdateArgsSchema: z.ZodType<Prisma.MatchRoundUpdateArgs> = z.object({
  select: MatchRoundSelectSchema.optional(),
  include: MatchRoundIncludeSchema.optional(),
  data: z.union([ MatchRoundUpdateInputSchema,MatchRoundUncheckedUpdateInputSchema ]),
  where: MatchRoundWhereUniqueInputSchema,
}).strict() ;

export const MatchRoundUpdateManyArgsSchema: z.ZodType<Prisma.MatchRoundUpdateManyArgs> = z.object({
  data: z.union([ MatchRoundUpdateManyMutationInputSchema,MatchRoundUncheckedUpdateManyInputSchema ]),
  where: MatchRoundWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const MatchRoundUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.MatchRoundUpdateManyAndReturnArgs> = z.object({
  data: z.union([ MatchRoundUpdateManyMutationInputSchema,MatchRoundUncheckedUpdateManyInputSchema ]),
  where: MatchRoundWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const MatchRoundDeleteManyArgsSchema: z.ZodType<Prisma.MatchRoundDeleteManyArgs> = z.object({
  where: MatchRoundWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RoundTeamCreateArgsSchema: z.ZodType<Prisma.RoundTeamCreateArgs> = z.object({
  select: RoundTeamSelectSchema.optional(),
  include: RoundTeamIncludeSchema.optional(),
  data: z.union([ RoundTeamCreateInputSchema,RoundTeamUncheckedCreateInputSchema ]),
}).strict() ;

export const RoundTeamUpsertArgsSchema: z.ZodType<Prisma.RoundTeamUpsertArgs> = z.object({
  select: RoundTeamSelectSchema.optional(),
  include: RoundTeamIncludeSchema.optional(),
  where: RoundTeamWhereUniqueInputSchema,
  create: z.union([ RoundTeamCreateInputSchema,RoundTeamUncheckedCreateInputSchema ]),
  update: z.union([ RoundTeamUpdateInputSchema,RoundTeamUncheckedUpdateInputSchema ]),
}).strict() ;

export const RoundTeamCreateManyArgsSchema: z.ZodType<Prisma.RoundTeamCreateManyArgs> = z.object({
  data: z.union([ RoundTeamCreateManyInputSchema,RoundTeamCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RoundTeamCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RoundTeamCreateManyAndReturnArgs> = z.object({
  data: z.union([ RoundTeamCreateManyInputSchema,RoundTeamCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RoundTeamDeleteArgsSchema: z.ZodType<Prisma.RoundTeamDeleteArgs> = z.object({
  select: RoundTeamSelectSchema.optional(),
  include: RoundTeamIncludeSchema.optional(),
  where: RoundTeamWhereUniqueInputSchema,
}).strict() ;

export const RoundTeamUpdateArgsSchema: z.ZodType<Prisma.RoundTeamUpdateArgs> = z.object({
  select: RoundTeamSelectSchema.optional(),
  include: RoundTeamIncludeSchema.optional(),
  data: z.union([ RoundTeamUpdateInputSchema,RoundTeamUncheckedUpdateInputSchema ]),
  where: RoundTeamWhereUniqueInputSchema,
}).strict() ;

export const RoundTeamUpdateManyArgsSchema: z.ZodType<Prisma.RoundTeamUpdateManyArgs> = z.object({
  data: z.union([ RoundTeamUpdateManyMutationInputSchema,RoundTeamUncheckedUpdateManyInputSchema ]),
  where: RoundTeamWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RoundTeamUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.RoundTeamUpdateManyAndReturnArgs> = z.object({
  data: z.union([ RoundTeamUpdateManyMutationInputSchema,RoundTeamUncheckedUpdateManyInputSchema ]),
  where: RoundTeamWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RoundTeamDeleteManyArgsSchema: z.ZodType<Prisma.RoundTeamDeleteManyArgs> = z.object({
  where: RoundTeamWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;