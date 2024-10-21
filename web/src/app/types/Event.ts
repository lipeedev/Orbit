export type Guest = {
  username: string
}

export type EventOwner = {
  uername: string
}

export type EventFomRequest = {
  name: string,
  description: string,
  date: string,
  time: string,
  location: string,
  owner: EventOwner,
  is_public: boolean,
  capacity: number,
  guests: Guest[]
};
