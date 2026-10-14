export interface EventDetail {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  times: { label?: string; time: string }[];
  venue?: string;
  location?: string;
  mapQuery?: string;
  theme: "gold" | "emerald" | "amber" | "ivory";
  iconName: string;
  featured?: boolean;
  notes?: string;
}

export interface WeddingData {
  couple: {
    groom: {
      firstName: string;
      fullName: string;
      parents: string;
    };
    bride: {
      firstName: string;
      fullName: string;
      parents: string;
    };
  };
  invitationText: {
    hosts: string;
    announcement: string;
    daughterOf: string;
  };
  events: EventDetail[];
  rsvp: {
    title: string;
    subtitle: string;
    contacts: { name: string; phone?: string; relation?: string }[];
    note: string;
  };
  compliments: {
    title: string;
    names: string[];
  };
  closing: {
    message: string;
  };
}

export const weddingData: WeddingData = {
  couple: {
    groom: {
      firstName: "Shariq",
      fullName: "Shariq Siddiqui",
      parents: "Mrs. & Mr. Zaheer Siddiqui",
    },
    bride: {
      firstName: "Andleeb",
      fullName: "Andleeb",
      parents: "Mrs. & Mr. Rizwan Ahmad",
    },
  },
  invitationText: {
    hosts: "Mrs. & Mr. Zaheer Siddiqui",
    announcement: "invite you to celebrate the wedding ceremony of their son",
    daughterOf: "daughter of Mrs. & Mr. Rizwan Ahmad",
  },
  events: [
    {
      id: "haldi-milad",
      title: "Haldi & Milad",
      date: "Friday, 06 November 2026",
      times: [
        { label: "Milad", time: "2:00 PM" },
        { label: "Haldi", time: "6:00 PM" },
      ],
      venue: "Family Residence",
      theme: "amber",
      iconName: "Sparkles",
      notes: "Blessed beginnings steeped in fragrance and joy",
    },
    {
      id: "mehendi",
      title: "Mehendi",
      date: "Saturday, 07 November 2026",
      times: [{ label: "Celebration", time: "6:00 PM" }],
      venue: "Family Residence",
      theme: "ivory",
      iconName: "Flower2",
      notes: "Henna traditions and sweet melodies with loved ones",
    },
    {
      id: "qawwali",
      title: "Bollywood Qawwali Night",
      date: "Sunday, 08 November 2026",
      times: [{ label: "Night Begins", time: "8:00 PM" }],
      theme: "emerald",
      iconName: "Music",
      featured: true,
      notes: "An enchanting evening of soulful music, poetry & celebration",
    },
    {
      id: "barat",
      title: "Barat",
      date: "Monday, 09 November 2026",
      times: [{ label: "Departure", time: "11:00 AM" }],
      location: "Fatehpur, Uttar Pradesh",
      theme: "gold",
      iconName: "Crown",
      notes: "The auspicious wedding procession arrives with royal grace",
    },
    {
      id: "walima",
      title: "Walima Reception",
      date: "Wednesday, 11 November 2026",
      times: [{ label: "Reception", time: "7:00 PM" }],
      venue: "Hotel Dulhan Palace",
      location: "Panchwati, Jhansi, Uttar Pradesh",
      mapQuery: "Hotel Dulhan Palace Panchwati Jhansi Uttar Pradesh",
      theme: "emerald",
      iconName: "HeartHandshake",
      featured: true,
      notes: "A grand feast honoring the union of Shariq and Andleeb",
    },
  ],
  rsvp: {
    title: "We Look Forward to Celebrating With You",
    subtitle: "Your prayers, blessings, and joyful presence will mean the world to our families.",
    contacts: [
      { name: "Mohd Shamim Siddiqui", phone: "" },
      { name: "Saleem Siddiqui", phone: "" },
      { name: "Waseem Siddiqui", phone: "" },
      { name: "Sehzil (Anshu)", phone: "" },
      { name: "Nomaan", phone: "" },
    ],
    note: "Please honor us with your gracious company.",
  },
  compliments: {
    title: "With Best Compliments",
    names: ["Irshad Navi", "Ali Khan"],
  },
  closing: {
    message: "Your presence will make our celebration even more special.",
  },
};
