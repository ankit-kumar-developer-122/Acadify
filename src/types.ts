export type Tutor = {
  id: string; name: string; initials: string; subject: string; subjects: string[]; headline: string; bio: string;
  rating: number; reviews: number; hourlyRate: number; experience: string; mode: string[]; area: string;
  languages: string[]; avatar: string; color: string; verified: boolean; availability: string; tag?: string;
}
export type Resource = { id: string; title: string; creator: string; type: string; subject: string; price: number; rating: number; color: string; icon: string; description: string }
export type Booking = { id: string; tutorId: string; subject: string; date: string; time: string; mode: string; status: 'Requested' | 'Confirmed' | 'Declined' | 'Completed'; learner?: string }
