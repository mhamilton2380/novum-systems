-- When the visitor says they're free to talk, so booking a call takes one reply
-- instead of a scheduling thread.
alter table public.leads
  add column if not exists availability text check (char_length(availability) <= 500);
