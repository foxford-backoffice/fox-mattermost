// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import type { Audit } from './audits';
import type { Channel } from './channels';
import type { Group } from './groups';
import type { Session } from './sessions';
import type { Team } from './teams';
import type {
  EBool,
  IDMappedObjects,
  RelationOneToManyUnique,
  RelationOneToOne,
} from './utilities';

export enum ENotifyBasic {
  Default = 'default',
  All = 'all',
  Mention = 'mention',
  None = 'none',
}

export enum ENotifyDesktopSound {
  Bing = 'Bing',
  Crackle = 'Crackle',
  Down = 'Down',
  Hello = 'Hello',
  Ripple = 'Ripple',
  Upstairs = 'Upstairs',
}

export enum ENotifyCallSound {
  Dynamic = 'Dynamic',
  Calm = 'Calm',
  Urgent = 'Urgent',
  Cheerful = 'Cheerful',
  None = '',
}

export enum ENotifyPushStatus {
  Ooo = 'ooo',
  Offline = 'offline',
  Away = 'away',
  Dnd = 'dnd',
  Online = 'online',
}

export enum ENotifyComments {
  Never = 'never',
  Root = 'root',
  Any = 'any',
}

export enum ENotifyMarkUnread {
  All = 'all',
  Mention = 'mention',
}

export type UserNotifyProps = {
  desktop: ENotifyBasic;
  desktop_sound: EBool;
  calls_desktop_sound: EBool;
  email: EBool;
  push: ENotifyBasic;
  push_status: ENotifyPushStatus;
  comments: ENotifyComments;
  first_name: EBool;
  channel: EBool;
  mention_keys: string;

  //highlight_keys: string;
  //mark_unread: ENotifyMarkUnread;

  desktop_notification_sound?: ENotifyDesktopSound;
  calls_notification_sound?: ENotifyCallSound;
  desktop_threads?: ENotifyBasic;
  email_threads?: ENotifyBasic;
  push_threads?: ENotifyBasic;
  auto_responder_active?: EBool;
  auto_responder_message?: string;
  calls_mobile_sound?: EBool | '';
  calls_mobile_notification_sound?: ENotifyCallSound;
};

export type UserProfile = {
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  username: string;
  password?: string;
  auth_service: string;
  email: string;
  nickname: string;
  first_name: string;
  last_name: string;
  position: string;
  roles: string;
  props?: Record<string, string>;
  notify_props: UserNotifyProps;
  last_password_update: number;
  last_picture_update: number;
  locale: string;
  timezone?: UserTimezone;
  //mfa_active: boolean;
  //last_activity_at: number;
  //is_bot: boolean;
  //bot_description: string;
  //terms_of_service_id: string;
  //terms_of_service_create_at: number;
  remote_id?: string;
  status?: string;
};

export type UserProfileWithLastViewAt = UserProfile & {
  last_viewed_at: number;
};

export type UsersState = {
  currentUserId: string;
  isManualStatus: RelationOneToOne<UserProfile, boolean>;
  mySessions: Session[];
  myAudits: Audit[];
  profiles: IDMappedObjects<UserProfile>;
  profilesInTeam: RelationOneToManyUnique<Team, UserProfile>;
  profilesNotInTeam: RelationOneToManyUnique<Team, UserProfile>;
  profilesWithoutTeam: Set<string>;
  profilesInChannel: RelationOneToManyUnique<Channel, UserProfile>;
  profilesNotInChannel: RelationOneToManyUnique<Channel, UserProfile>;
  profilesInGroup: RelationOneToManyUnique<Group, UserProfile>;
  profilesNotInGroup: RelationOneToManyUnique<Group, UserProfile>;
  statuses: RelationOneToOne<UserProfile, string>;
  stats: Partial<UsersStats>;
  filteredStats: Partial<UsersStats>;
  myUserAccessTokens: Record<string, UserAccessToken>;
  lastActivity: RelationOneToOne<UserProfile, number>;
  dndEndTimes: RelationOneToOne<UserProfile, number>;
};

export type UserTimezone = {
  useAutomaticTimezone: boolean | string;
  automaticTimezone: string;
  manualTimezone: string;
};

export type UserStatus = {
  user_id: string;
  status: string;
  manual?: boolean;
  last_activity_at?: number;
  active_channel?: string;
  dnd_end_time?: number;
};

export enum CustomStatusDuration {
  DONT_CLEAR = '',
  THIRTY_MINUTES = 'thirty_minutes',
  ONE_HOUR = 'one_hour',
  FOUR_HOURS = 'four_hours',
  TODAY = 'today',
  THIS_WEEK = 'this_week',
  DATE_AND_TIME = 'date_and_time',
  CUSTOM_DATE_TIME = 'custom_date_time',
}

export type UserCustomStatus = {
  emoji: string;
  text: string;
  duration: CustomStatusDuration;
  expires_at?: string;
};

export type UserAccessToken = {
  id: string;
  token?: string;
  user_id: string;
  description: string;
  is_active: boolean;
};

export type UsersStats = {
  total_users_count: number;
};

export type GetFilteredUsersStatsOpts = {
  in_team?: string;
  in_channel?: string;
  include_deleted?: boolean;
  include_bots?: boolean;
  include_remote_users?: boolean;
  roles?: string[];
  channel_roles?: string[];
  team_roles?: string[];
};

export type AuthChangeResponse = {
  follow_link: string;
};
