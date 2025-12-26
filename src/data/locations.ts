// Path: src/data/locations.ts

import { Location } from "@/lib/types/location";

export const accessibleLocations: Location[] = [
  {
    id: 1,
    name: "EmQuartier",
    bookingLinks: [
      {
        provider: "Agoda",
        url: "https://www.agoda.com/partners/partnersearch.aspx?cid=1844104&pcs=1&city=9395",
      },
      {
        provider: "Trip.com",
        url: "https://www.trip.com/hotels/bangkok-hotel-detail-grande-centre-point-hotel-terminal21",
      },
    ],
    position: [13.7305, 100.5697],
    category: "Shopping Mall",
    accessibility: "high",
    features: [
      "Multiple Elevators",
      "Accessible Restrooms",
      "Wide Walkways",
      "Wheelchair Service",
      "Disabled Parking",
      "Direct BTS Access",
    ],
    description:
      "Modern mall with complete accessibility features and skywalk connections",
    accessibilityScores: {
      parking: {
        name: "Parking",
        isLiked: null,
        votes: {
          like: 30,
          dislike: 10,
          notSure: 5,
        },
        description: "Multiple disabled parking spots near elevators",
        images: [
          {
            url: "/image/map/location/location_1/review-location/parking/parking_1.jpg",
            caption: "Accessible parking spots near entrance",
          },
          {
            url: "/image/map/location/location_1/review-location/parking/parking_1.jpg",
            caption: "Clear signage for disabled parking",
          },
        ],
      },
      entrance: {
        name: "Main Entrance",
        isLiked: null,
        votes: {
          like: 35,
          dislike: 12,
          notSure: 5,
        },
        description: "Level entrances with automatic doors",
        images: [
          {
            url: "/image/map/location/location_1/review-location/main-entrance/main-entrance_1.jpg",
            caption: "Automatic sliding doors",
          },
          {
            url: "/image/map/location/location_1/review-location/main-entrance/main-entrance_1.jpg",
            caption: "Level entrance from BTS",
          },
        ],
      },
      ramp: {
        name: "Ramps",
        isLiked: null,
        votes: {
          like: 32,
          dislike: 10,
          notSure: 7,
        },
        description: "Gentle slopes with handrails at all level changes",
        images: [
          {
            url: "/image/map/location/location_1/review-location/ramps/ramps_1.jpg",
            caption: "Main entrance ramp",
          },
        ],
      },
      pathway: {
        name: "Pathways",
        isLiked: null,
        votes: {
          like: 45,
          dislike: 20,
          notSure: 8,
        },
        description: "Wide corridors and ramps throughout",
        images: [
          {
            url: "/image/map/location/location_1/review-location/pathways/pathways_1.jpg",
            caption: "Wide main corridor",
          },
          {
            url: "/image/map/location/location_1/review-location/pathways/pathways_1.jpg",
            caption: "Clear pathway markings",
          },
        ],
      },
      elevator: {
        name: "Elevators",
        isLiked: null,
        votes: {
          like: 40,
          dislike: 15,
          notSure: 12,
        },
        description: "Multiple large elevators with clear signage",
        images: [
          {
            url: "/image/map/location/location_1/review-location/elevators/elevators_1.jpg",
            caption: "Main elevator hall",
          },
          {
            url: "/image/map/location/location_1/review-location/elevators/elevators_1.jpg",
            caption: "Elevator control panel height",
          },
        ],
      },
      restroom: {
        name: "Restrooms",
        isLiked: null,
        votes: {
          like: 25,
          dislike: 8,
          notSure: 5,
        },
        description: "Accessible restrooms on every floor",
        images: [
          {
            url: "/image/map/location/location_1/review-location/restrooms/restrooms_1.jpg",
            caption: "Accessible restroom entrance",
          },
          {
            url: "/image/map/location/location_1/review-location/restrooms/restrooms_1.jpg",
            caption: "Support rails installation",
          },
        ],
      },
      seating: {
        name: "Seating Areas",
        isLiked: null,
        votes: {
          like: 22,
          dislike: 8,
          notSure: 5,
        },
        description: "Multiple rest areas with accessible seating throughout",
        images: [
          {
            url: "/image/map/location/location_1/review-location/seating-areas/seating-areas_1.jpg",
            caption: "Rest area with adequate space",
          },
        ],
      },
      staffAssistance: {
        name: "Staff Assistance",
        isLiked: null,
        votes: {
          like: 28,
          dislike: 8,
          notSure: 5,
        },
        description: "Trained staff available on request",
        images: [
          {
            url: "/image/map/location/location_1/review-location/staff-assistance/staff-assistance_1.jpg",
            caption: "Information counter with lowered section",
          },
        ],
      },
      etc: {
        name: "Etc",
        isLiked: null,
        votes: {
          like: 22,
          dislike: 8,
          notSure: 5,
        },
        description: "Trained staff available on request",
        images: [
          {
            url: "/image/map/location/location_1/review-location/etc/etc_1.jpg",
            caption: "Information counter with lowered section",
          },
        ],
      },
    },
  },
  {
    id: 2,
    name: "Terminal 21",
    position: [13.7373, 100.5602],
    category: "Shopping Mall",
    accessibility: "high",
    features: [
      "Glass Elevators",
      "Accessible Toilets",
      "Wide Corridors",
      "Wheelchair Available",
      "Close to BTS",
    ],
    description: "Airport-themed mall with excellent accessibility features",
    accessibilityScores: {
      parking: {
        name: "Parking",
        isLiked: null,
        votes: {
          like: 20,
          dislike: 8,
          notSure: 4,
        },
        description: "Designated parking near elevators",
        images: [
          {
            url: "/image/map/location/location_1/review-location/parking/parking_1.jpg",
            caption: "Dedicated wheelchair parking area",
          },
        ],
      },
      entrance: {
        name: "Main Entrance",
        isLiked: null,
        votes: {
          like: 30,
          dislike: 12,
          notSure: 5,
        },
        description: "Direct skywalk access",
        images: [
          {
            url: "/image/map/location/location_1/review-location/main-entrance/main-entrance_1.jpg",
            caption: "Skywalk entrance",
          },
          {
            url: "/image/map/location/location_1/review-location/main-entrance/main-entrance_1.jpg",
            caption: "Ground level entrance",
          },
        ],
      },
      ramp: {
        name: "Ramps",
        isLiked: null,
        votes: {
          like: 28,
          dislike: 10,
          notSure: 6,
        },
        description: "Well-maintained ramps at all entrances",
        images: [
          {
            url: "/image/map/location/location_1/review-location/ramps/ramps_1.jpg",
            caption: "Main ramp with handrails",
          },
        ],
      },
      pathway: {
        name: "Pathways",
        isLiked: null,
        votes: {
          like: 35,
          dislike: 50,
          notSure: 6,
        },
        description: "Wide paths with smooth surfaces",
        images: [
          {
            url: "/image/map/location/location_1/review-location/pathways/pathways_1.jpg",
            caption: "Main shopping corridor",
          },
        ],
      },
      elevator: {
        name: "Elevators",
        isLiked: null,
        votes: {
          like: 38,
          dislike: 15,
          notSure: 5,
        },
        description: "Multiple glass elevators throughout",
        images: [
          {
            url: "/image/map/location/location_1/review-location/elevators/elevators_1.jpg",
            caption: "Glass elevator",
          },
          {
            url: "/image/map/location/location_1/review-location/elevators/elevators_1.jpg",
            caption: "Elevator interior",
          },
        ],
      },
      restroom: {
        name: "Restrooms",
        isLiked: null,
        votes: {
          like: 28,
          dislike: 10,
          notSure: 5,
        },
        description: "Accessible facilities on all floors",
        images: [
          {
            url: "/image/map/location/location_1/review-location/restrooms/restrooms_1.jpg",
            caption: "Accessible toilet facilities",
          },
        ],
      },
      seating: {
        name: "Seating Areas",
        isLiked: null,
        votes: {
          like: 25,
          dislike: 9,
          notSure: 5,
        },
        description: "Comfortable rest areas on each floor",
        images: [
          {
            url: "/image/map/location/location_1/review-location/seating-areas/seating-areas_1.jpg",
            caption: "Public seating area",
          },
        ],
      },
      staffAssistance: {
        name: "Staff Assistance",
        isLiked: null,
        votes: {
          like: 10,
          dislike: 10,
          notSure: 16,
        },
        description: "Helpful staff with wheelchair assistance available",
        images: [
          {
            url: "/image/map/location/location_1/review-location/staff-assistance/staff-assistance_1.jpg",
            caption: "Customer service counter",
          },
        ],
      },
      etc: {
        name: "Etc",
        isLiked: null,
        votes: {
          like: 10,
          dislike: 10,
          notSure: 16,
        },
        description: "Helpful staff with wheelchair assistance available",
        images: [
          {
            url: "/image/map/location/location_1/review-location/etc/etc_1.jpg",
            caption: "Customer service counter",
          },
        ],
      },
    },
  },
  {
    id: 3,
    name: "IconSiam",
    position: [13.726, 100.5106],
    category: "Shopping Mall",
    accessibility: "high",
    features: [
      "Wide Ramps",
      "Accessible Restrooms",
      "Multiple Elevators",
      "Disabled Parking",
      "Wheelchair Rental",
      "River Boat Access",
    ],
    description:
      "A luxury riverside mall with top-tier accessibility features and seamless transport connections.",
    accessibilityScores: {
      parking: {
        name: "Parking",
        isLiked: null,
        votes: {
          like: 25,
          dislike: 5,
          notSure: 3,
        },
        description: "Designated accessible parking close to mall entrances.",
        images: [
          {
            url: "/image/map/location/location_1/review-location/parking/parking_1.jpg",
            caption: "Accessible parking spaces",
          },
        ],
      },
      entrance: {
        name: "Main Entrance",
        isLiked: null,
        votes: {
          like: 32,
          dislike: 6,
          notSure: 4,
        },
        description: "Step-free entrances with automatic doors.",
        images: [
          {
            url: "/image/map/location/location_1/review-location/main-entrance/main-entrance_1.jpg",
            caption: "Main entrance with automatic doors",
          },
        ],
      },
      ramp: {
        name: "Ramps",
        isLiked: null,
        votes: {
          like: 30,
          dislike: 7,
          notSure: 5,
        },
        description: "Wide ramps with handrails at all entry points.",
        images: [
          {
            url: "/image/map/location/location_1/review-location/ramps/ramps_1.jpg",
            caption: "Main entrance ramp with railings",
          },
        ],
      },
      pathway: {
        name: "Pathways",
        isLiked: null,
        votes: {
          like: 40,
          dislike: 10,
          notSure: 5,
        },
        description: "Spacious walkways with smooth surfaces.",
        images: [
          {
            url: "/image/map/location/location_1/review-location/pathways/pathways_1.jpg",
            caption: "Wide pathways inside the mall",
          },
        ],
      },
      elevator: {
        name: "Elevators",
        isLiked: null,
        votes: {
          like: 35,
          dislike: 10,
          notSure: 8,
        },
        description: "Large elevators with audio and Braille indicators.",
        images: [
          {
            url: "/image/map/location/location_1/review-location/elevators/elevators_1.jpg",
            caption: "Spacious elevator with Braille buttons",
          },
        ],
      },
      restroom: {
        name: "Restrooms",
        isLiked: null,
        votes: {
          like: 30,
          dislike: 6,
          notSure: 3,
        },
        description: "Accessible restrooms available on every floor.",
        images: [
          {
            url: "/image/map/location/location_1/review-location/restrooms/restrooms_1.jpg",
            caption: "Accessible restroom with support bars",
          },
        ],
      },
      seating: {
        name: "Seating Areas",
        isLiked: null,
        votes: {
          like: 22,
          dislike: 5,
          notSure: 4,
        },
        description: "Rest areas with accessible seating throughout.",
        images: [
          {
            url: "/image/map/location/location_1/review-location/seating-areas/seating-areas_1.jpg",
            caption: "Comfortable seating area with accessible spaces",
          },
        ],
      },
      staffAssistance: {
        name: "Staff Assistance",
        isLiked: null,
        votes: {
          like: 18,
          dislike: 4,
          notSure: 6,
        },
        description: "Trained staff available for accessibility assistance.",
        images: [
          {
            url: "/image/map/location/location_1/review-location/staff-assistance/staff-assistance_1.jpg",
            caption: "Information counter with assistance service",
          },
        ],
      },
      etc: {
        name: "Etc",
        isLiked: null,
        votes: {
          like: 18,
          dislike: 4,
          notSure: 6,
        },
        description: "Trained staff available for accessibility assistance.",
        images: [
          {
            url: "/image/map/location/location_1/review-location/etc/etc_1.jpg",
            caption: "Information counter with assistance service",
          },
        ],
      },
    },
  },
  {
    id: 4,
    name: "Siam Paragon",
    position: [13.7464, 100.5321],
    category: "Shopping Mall",
    accessibility: "high",
    features: [
      "Direct BTS Access",
      "Multiple Elevators",
      "Accessible Toilets",
      "Wide Walkways",
      "Wheelchair Rental Service",
    ],
    description:
      "A high-end shopping destination with comprehensive accessibility features.",
    accessibilityScores: {
      parking: {
        name: "Parking",
        isLiked: null,
        votes: {
          like: 28,
          dislike: 7,
          notSure: 3,
        },
        description: "Dedicated disabled parking spaces near elevators.",
        images: [
          {
            url: "/image/map/location/location_1/review-location/parking/parking_1.jpg",
            caption: "Disabled parking area",
          },
        ],
      },
      entrance: {
        name: "Main Entrance",
        isLiked: null,
        votes: {
          like: 35,
          dislike: 8,
          notSure: 4,
        },
        description: "Step-free entrance with wide automatic doors.",
        images: [
          {
            url: "/image/map/location/location_1/review-location/main-entrance/main-entrance_1.jpg",
            caption: "Spacious automatic doors at the main entrance",
          },
        ],
      },
      ramp: {
        name: "Ramps",
        isLiked: null,
        votes: {
          like: 30,
          dislike: 6,
          notSure: 5,
        },
        description: "Smooth ramps with handrails in all public areas.",
        images: [
          {
            url: "/image/map/location/location_1/review-location/ramps/ramps_1.jpg",
            caption: "Ramp with non-slip surface",
          },
        ],
      },
      pathway: {
        name: "Pathways",
        isLiked: null,
        votes: {
          like: 38,
          dislike: 12,
          notSure: 6,
        },
        description: "Wide and accessible pathways with clear signage.",
        images: [
          {
            url: "/image/map/location/location_1/review-location/pathways/pathways_1.jpg",
            caption: "Broad pathways in the shopping area",
          },
        ],
      },
      elevator: {
        name: "Elevators",
        isLiked: null,
        votes: {
          like: 42,
          dislike: 8,
          notSure: 5,
        },
        description: "Spacious elevators with priority access for wheelchairs.",
        images: [
          {
            url: "/image/map/location/location_1/review-location/elevators/elevators_1.jpg",
            caption: "Modern elevators with wheelchair priority signage",
          },
        ],
      },
      restroom: {
        name: "Restrooms",
        isLiked: null,
        votes: {
          like: 27,
          dislike: 5,
          notSure: 3,
        },
        description: "Well-equipped accessible restrooms on every floor.",
        images: [
          {
            url: "/image/map/location/location_1/review-location/restrooms/restrooms_1.jpg",
            caption: "Accessible restroom with support handles",
          },
        ],
      },
      seating: {
        name: "Seating Areas",
        isLiked: null,
        votes: {
          like: 22,
          dislike: 6,
          notSure: 5,
        },
        description: "Comfortable seating areas throughout the mall.",
        images: [
          {
            url: "/image/map/location/location_1/review-location/seating-areas/seating-areas_1.jpg",
            caption: "Seating area with wide spaces",
          },
        ],
      },
      staffAssistance: {
        name: "Staff Assistance",
        isLiked: null,
        votes: {
          like: 20,
          dislike: 4,
          notSure: 6,
        },
        description:
          "Friendly staff trained to assist with accessibility needs.",
        images: [
          {
            url: "/image/map/location/location_1/review-location/staff-assistance/staff-assistance_1.jpg",
            caption: "Customer service counter with accessibility information",
          },
        ],
      },
      etc: {
        name: "Etc",
        isLiked: null,
        votes: {
          like: 20,
          dislike: 4,
          notSure: 6,
        },
        description:
          "Friendly staff trained to assist with accessibility needs.",
        images: [
          {
            url: "/image/map/location/location_1/review-location/etc/etc_1.jpg",
            caption: "Customer service counter with accessibility information",
          },
        ],
      },
    },
  },
  // เพิ่ม mock data ใหม่ตรงนี้
  {
    id: 5,
    name: "CentralWorld",
    position: [13.7466, 100.5393],
    category: "Shopping Mall",
    accessibility: "high",
    features: [
      "Spacious Elevators",
      "Accessible Restrooms on Every Floor",
      "Wide Walkways",
      "Wheelchair Rental Service",
      "BTS Skywalk Connection",
      "Accessible Parking",
    ],
    description:
      "One of Bangkok's largest shopping complexes with excellent accessibility features and connected to multiple transport hubs.",
    accessibilityScores: {
      parking: {
        name: "Parking",
        isLiked: null,
        votes: {
          like: 32,
          dislike: 8,
          notSure: 4,
        },
        description:
          "Reserved accessible parking spaces near mall entrances with direct elevator access.",
        images: [
          {
            url: "/image/map/location/location_5/review-location/parking/parking_1.jpg",
            caption: "Designated accessible parking area",
          },
          {
            url: "/image/map/location/location_5/review-location/parking/parking_2.jpg",
            caption: "Clear signage for accessible parking",
          },
        ],
      },
      entrance: {
        name: "Main Entrance",
        isLiked: null,
        votes: {
          like: 38,
          dislike: 7,
          notSure: 3,
        },
        description:
          "Multiple accessible entrances with automatic doors and no steps.",
        images: [
          {
            url: "/image/map/location/location_5/review-location/main-entrance/main-entrance_1.jpg",
            caption: "Main entrance with automatic sliding doors",
          },
          {
            url: "/image/map/location/location_5/review-location/main-entrance/main-entrance_2.jpg",
            caption: "Level entry from BTS skywalk",
          },
        ],
      },
      ramp: {
        name: "Ramps",
        isLiked: null,
        votes: {
          like: 36,
          dislike: 8,
          notSure: 4,
        },
        description:
          "Well-designed ramps with appropriate gradients and handrails at all level changes.",
        images: [
          {
            url: "/image/map/location/location_5/review-location/ramps/ramps_1.jpg",
            caption: "Wide ramp with handrails",
          },
          {
            url: "/image/map/location/location_5/review-location/ramps/ramps_2.jpg",
            caption: "Gentle slope ramp to food court area",
          },
        ],
      },
      pathway: {
        name: "Pathways",
        isLiked: null,
        votes: {
          like: 42,
          dislike: 9,
          notSure: 5,
        },
        description:
          "Spacious corridors throughout the mall with smooth, non-slip flooring.",
        images: [
          {
            url: "/image/map/location/location_5/review-location/pathways/pathways_1.jpg",
            caption: "Wide main corridor with ample space for wheelchairs",
          },
          {
            url: "/image/map/location/location_5/review-location/pathways/pathways_2.jpg",
            caption: "Clear, unobstructed shopping areas",
          },
        ],
      },
      elevator: {
        name: "Elevators",
        isLiked: null,
        votes: {
          like: 44,
          dislike: 6,
          notSure: 3,
        },
        description:
          "Large elevators with tactile buttons, voice announcements, and priority access.",
        images: [
          {
            url: "/image/map/location/location_5/review-location/elevators/elevators_1.jpg",
            caption: "Spacious elevator with accessible controls",
          },
          {
            url: "/image/map/location/location_5/review-location/elevators/elevators_2.jpg",
            caption: "Priority signage for wheelchair users",
          },
        ],
      },
      restroom: {
        name: "Restrooms",
        isLiked: null,
        votes: {
          like: 33,
          dislike: 7,
          notSure: 4,
        },
        description:
          "Dedicated accessible restrooms on every floor with support rails and emergency call buttons.",
        images: [
          {
            url: "/image/map/location/location_5/review-location/restrooms/restrooms_1.jpg",
            caption: "Accessible toilet with support bars",
          },
          {
            url: "/image/map/location/location_5/review-location/restrooms/restrooms_2.jpg",
            caption: "Washbasins at accessible height",
          },
        ],
      },
      seating: {
        name: "Seating Areas",
        isLiked: null,
        votes: {
          like: 28,
          dislike: 5,
          notSure: 3,
        },
        description:
          "Ample rest areas with accessible seating options throughout the mall.",
        images: [
          {
            url: "/image/map/location/location_5/review-location/seating-areas/seating-areas_1.jpg",
            caption: "Rest area with space for wheelchairs",
          },
          {
            url: "/image/map/location/location_5/review-location/seating-areas/seating-areas_2.jpg",
            caption: "Comfortable seating in common areas",
          },
        ],
      },
      staffAssistance: {
        name: "Staff Assistance",
        isLiked: null,
        votes: {
          like: 25,
          dislike: 5,
          notSure: 8,
        },
        description:
          "Trained staff available at information counters for accessibility assistance.",
        images: [
          {
            url: "/image/map/location/location_5/review-location/staff-assistance/staff-assistance_1.jpg",
            caption: "Information counter with accessibility support",
          },
          {
            url: "/image/map/location/location_5/review-location/staff-assistance/staff-assistance_2.jpg",
            caption: "Staff assisting wheelchair user",
          },
        ],
      },
      etc: {
        name: "Etc",
        isLiked: null,
        votes: {
          like: 22,
          dislike: 4,
          notSure: 7,
        },
        description:
          "Additional amenities include wheelchair charging stations and accessible ATMs.",
        images: [
          {
            url: "/image/map/location/location_5/review-location/etc/etc_1.jpg",
            caption: "Wheelchair charging station",
          },
          {
            url: "/image/map/location/location_5/review-location/etc/etc_2.jpg",
            caption: "Accessible ATM machine",
          },
        ],
      },
    },
  },
  {
    id: 6,
    name: "MBK Center",
    position: [13.7445, 100.5302],
    category: "Shopping Mall",
    accessibility: "medium",
    features: [
      "Elevators",
      "Some Accessible Restrooms",
      "Skywalk Connection",
      "Limited Wheelchair Service",
      "Close to BTS",
    ],
    description:
      "Popular shopping center with moderate accessibility. Some areas may require assistance for wheelchair users.",
    accessibilityScores: {
      parking: {
        name: "Parking",
        isLiked: null,
        votes: {
          like: 18,
          dislike: 15,
          notSure: 8,
        },
        description: "Limited accessible parking spaces available.",
        images: [
          {
            url: "/image/map/location/location_6/review-location/parking/parking_1.jpg",
            caption: "Parking area with some accessible spots",
          },
        ],
      },
      entrance: {
        name: "Main Entrance",
        isLiked: null,
        votes: {
          like: 22,
          dislike: 16,
          notSure: 7,
        },
        description:
          "Main entrances accessible but some side entrances have steps.",
        images: [
          {
            url: "/image/map/location/location_6/review-location/main-entrance/main-entrance_1.jpg",
            caption: "Main entrance with ramp access",
          },
        ],
      },
      ramp: {
        name: "Ramps",
        isLiked: null,
        votes: {
          like: 20,
          dislike: 18,
          notSure: 8,
        },
        description: "Some ramps available but may be steep in certain areas.",
        images: [
          {
            url: "/image/map/location/location_6/review-location/ramps/ramps_1.jpg",
            caption: "Ramp at secondary entrance",
          },
        ],
      },
      pathway: {
        name: "Pathways",
        isLiked: null,
        votes: {
          like: 25,
          dislike: 24,
          notSure: 9,
        },
        description:
          "Corridors can be narrow in some areas with occasional obstacles.",
        images: [
          {
            url: "/image/map/location/location_6/review-location/pathways/pathways_1.jpg",
            caption: "Main corridor with some congestion",
          },
        ],
      },
      elevator: {
        name: "Elevators",
        isLiked: null,
        votes: {
          like: 28,
          dislike: 18,
          notSure: 7,
        },
        description:
          "Elevators available but can be crowded during peak hours.",
        images: [
          {
            url: "/image/map/location/location_6/review-location/elevators/elevators_1.jpg",
            caption: "Elevator to upper floors",
          },
        ],
      },
      restroom: {
        name: "Restrooms",
        isLiked: null,
        votes: {
          like: 15,
          dislike: 22,
          notSure: 8,
        },
        description:
          "Limited accessible restrooms, not available on all floors.",
        images: [
          {
            url: "/image/map/location/location_6/review-location/restrooms/restrooms_1.jpg",
            caption: "Accessible restroom on ground floor",
          },
        ],
      },
      seating: {
        name: "Seating Areas",
        isLiked: null,
        votes: {
          like: 18,
          dislike: 15,
          notSure: 6,
        },
        description: "Some rest areas available but limited in number.",
        images: [
          {
            url: "/image/map/location/location_6/review-location/seating-areas/seating-areas_1.jpg",
            caption: "Seating area near food court",
          },
        ],
      },
      staffAssistance: {
        name: "Staff Assistance",
        isLiked: null,
        votes: {
          like: 22,
          dislike: 12,
          notSure: 10,
        },
        description:
          "Staff generally helpful but not specifically trained for accessibility assistance.",
        images: [
          {
            url: "/image/map/location/location_6/review-location/staff-assistance/staff-assistance_1.jpg",
            caption: "Information counter",
          },
        ],
      },
      etc: {
        name: "Etc",
        isLiked: null,
        votes: {
          like: 15,
          dislike: 15,
          notSure: 12,
        },
        description:
          "Some shops may have limited access due to narrow entrances or steps.",
        images: [
          {
            url: "/image/map/location/location_6/review-location/etc/etc_1.jpg",
            caption: "Shop entrance with step",
          },
        ],
      },
    },
  },
  {
    id: 7,
    name: "Lumpini Park",
    position: [13.7305, 100.5412],
    category: "Park",
    accessibility: "medium",
    features: [
      "Wide Pathways",
      "Some Accessible Restrooms",
      "Rest Areas",
      "Partial Shade",
      "Near MRT Station",
    ],
    description:
      "Bangkok's largest central park with reasonably accessible paths for wheelchair users, though some areas may present challenges.",
    accessibilityScores: {
      parking: {
        name: "Parking",
        isLiked: null,
        votes: {
          like: 20,
          dislike: 15,
          notSure: 10,
        },
        description: "Limited accessible parking spaces near entrances.",
        images: [
          {
            url: "/image/map/location/location_7/review-location/parking/parking_1.jpg",
            caption: "Parking area near main entrance",
          },
        ],
      },
      entrance: {
        name: "Main Entrance",
        isLiked: null,
        votes: {
          like: 25,
          dislike: 12,
          notSure: 8,
        },
        description: "Most entrances are accessible but some have small steps.",
        images: [
          {
            url: "/image/map/location/location_7/review-location/main-entrance/main-entrance_1.jpg",
            caption: "Main park entrance",
          },
        ],
      },
      ramp: {
        name: "Ramps",
        isLiked: null,
        votes: {
          like: 18,
          dislike: 20,
          notSure: 12,
        },
        description: "Limited ramps available at some entrances and features.",
        images: [
          {
            url: "/image/map/location/location_7/review-location/ramps/ramps_1.jpg",
            caption: "Ramp to lakeside area",
          },
        ],
      },
      pathway: {
        name: "Pathways",
        isLiked: null,
        votes: {
          like: 30,
          dislike: 15,
          notSure: 8,
        },
        description:
          "Main pathways are paved and wide, but some garden trails may be uneven or gravel-covered.",
        images: [
          {
            url: "/image/map/location/location_7/review-location/pathways/pathways_1.jpg",
            caption: "Wide main path around the lake",
          },
          {
            url: "/image/map/location/location_7/review-location/pathways/pathways_2.jpg",
            caption: "Some garden paths with rougher surfaces",
          },
        ],
      },
      elevator: {
        name: "Elevators",
        isLiked: null,
        votes: {
          like: 10,
          dislike: 5,
          notSure: 25,
        },
        description:
          "Not applicable for most park areas as it's primarily ground-level.",
        images: [],
      },
      restroom: {
        name: "Restrooms",
        isLiked: null,
        votes: {
          like: 15,
          dislike: 22,
          notSure: 12,
        },
        description:
          "Some accessible restrooms available but limited in number and may not meet all standards.",
        images: [
          {
            url: "/image/map/location/location_7/review-location/restrooms/restrooms_1.jpg",
            caption: "Accessible restroom near main entrance",
          },
        ],
      },
      seating: {
        name: "Seating Areas",
        isLiked: null,
        votes: {
          like: 35,
          dislike: 10,
          notSure: 5,
        },
        description:
          "Numerous benches and rest areas throughout the park with shade.",
        images: [
          {
            url: "/image/map/location/location_7/review-location/seating-areas/seating-areas_1.jpg",
            caption: "Shaded seating area by the lake",
          },
          {
            url: "/image/map/location/location_7/review-location/seating-areas/seating-areas_2.jpg",
            caption: "Covered pavilion with seating",
          },
        ],
      },
      staffAssistance: {
        name: "Staff Assistance",
        isLiked: null,
        votes: {
          like: 18,
          dislike: 15,
          notSure: 22,
        },
        description:
          "Park staff available but limited dedicated assistance for accessibility needs.",
        images: [
          {
            url: "/image/map/location/location_7/review-location/staff-assistance/staff-assistance_1.jpg",
            caption: "Park staff at information point",
          },
        ],
      },
      etc: {
        name: "Etc",
        isLiked: null,
        votes: {
          like: 20,
          dislike: 12,
          notSure: 18,
        },
        description:
          "Water fountains and some exercise equipment may not be fully accessible.",
        images: [
          {
            url: "/image/map/location/location_7/review-location/etc/etc_1.jpg",
            caption: "Park facilities",
          },
        ],
      },
    },
  },
  {
    id: 8,
    name: "Siam Discovery",
    position: [13.7456, 100.5331],
    category: "Shopping Mall",
    accessibility: "high",
    features: [
      "Modern Elevators",
      "Accessible Restrooms",
      "Wide Corridors",
      "BTS Connection",
      "Wheelchair Service",
      "Assistance Staff",
    ],
    description:
      "Contemporary lifestyle mall with excellent accessibility features and modern, spacious design.",
    accessibilityScores: {
      parking: {
        name: "Parking",
        isLiked: null,
        votes: {
          like: 32,
          dislike: 6,
          notSure: 4,
        },
        description:
          "Well-designed accessible parking with direct elevator access.",
        images: [
          {
            url: "/image/map/location/location_8/review-location/parking/parking_1.jpg",
            caption: "Accessible parking spaces in basement",
          },
          {
            url: "/image/map/location/location_8/review-location/parking/parking_2.jpg",
            caption: "Direct path to elevators",
          },
        ],
      },
      entrance: {
        name: "Main Entrance",
        isLiked: null,
        votes: {
          like: 38,
          dislike: 5,
          notSure: 3,
        },
        description:
          "Step-free entrances with automatic doors and good signage.",
        images: [
          {
            url: "/image/map/location/location_8/review-location/main-entrance/main-entrance_1.jpg",
            caption: "Main entrance with automatic doors",
          },
          {
            url: "/image/map/location/location_8/review-location/main-entrance/main-entrance_2.jpg",
            caption: "Level access from BTS",
          },
        ],
      },
      ramp: {
        name: "Ramps",
        isLiked: null,
        votes: {
          like: 34,
          dislike: 4,
          notSure: 6,
        },
        description: "Gentle ramps at all level changes with proper handrails.",
        images: [
          {
            url: "/image/map/location/location_8/review-location/ramps/ramps_1.jpg",
            caption: "Interior ramp with handrails",
          },
        ],
      },
      pathway: {
        name: "Pathways",
        isLiked: null,
        votes: {
          like: 40,
          dislike: 7,
          notSure: 3,
        },
        description:
          "Spacious walkways with smooth surfaces and good lighting.",
        images: [
          {
            url: "/image/map/location/location_8/review-location/pathways/pathways_1.jpg",
            caption: "Wide corridor on main shopping floor",
          },
          {
            url: "/image/map/location/location_8/review-location/pathways/pathways_2.jpg",
            caption: "Open space design with clear paths",
          },
        ],
      },
      elevator: {
        name: "Elevators",
        isLiked: null,
        votes: {
          like: 42,
          dislike: 4,
          notSure: 2,
        },
        description:
          "Modern, spacious elevators with tactile buttons and voice announcements.",
        images: [
          {
            url: "/image/map/location/location_8/review-location/elevators/elevators_1.jpg",
            caption: "Modern glass elevator",
          },
          {
            url: "/image/map/location/location_8/review-location/elevators/elevators_2.jpg",
            caption: "Accessible control panel",
          },
        ],
      },
      restroom: {
        name: "Restrooms",
        isLiked: null,
        votes: {
          like: 36,
          dislike: 5,
          notSure: 4,
        },
        description:
          "Well-designed accessible restrooms on every floor with all necessary features.",
        images: [
          {
            url: "/image/map/location/location_8/review-location/restrooms/restrooms_1.jpg",
            caption: "Spacious accessible toilet cubicle",
          },
          {
            url: "/image/map/location/location_8/review-location/restrooms/restrooms_2.jpg",
            caption: "Accessible sink and hand dryers",
          },
        ],
      },
      seating: {
        name: "Seating Areas",
        isLiked: null,
        votes: {
          like: 30,
          dislike: 6,
          notSure: 4,
        },
        description:
          "Ample seating throughout the mall with accessible options.",
        images: [
          {
            url: "/image/map/location/location_8/review-location/seating-areas/seating-areas_1.jpg",
            caption: "Comfortable seating area on floor 3",
          },
        ],
      },
      staffAssistance: {
        name: "Staff Assistance",
        isLiked: null,
        votes: {
          like: 32,
          dislike: 4,
          notSure: 8,
        },
        description:
          "Well-trained staff with specific accessibility assistance available.",
        images: [
          {
            url: "/image/map/location/location_8/review-location/staff-assistance/staff-assistance_1.jpg",
            caption: "Service desk with accessibility information",
          },
        ],
      },
      etc: {
        name: "Etc",
        isLiked: null,
        votes: {
          like: 28,
          dislike: 5,
          notSure: 10,
        },
        description:
          "Digital directories at accessible height and other thoughtful accessibility features.",
        images: [
          {
            url: "/image/map/location/location_8/review-location/etc/etc_1.jpg",
            caption: "Accessible digital directory",
          },
          {
            url: "/image/map/location/location_8/review-location/etc/etc_2.jpg",
            caption: "Charging station for electric wheelchairs",
          },
        ],
      },
    },
  },
  {
    id: 9,
    name: "Central Embassy",
    position: [13.7446, 100.547],
    category: "Shopping Mall",
    accessibility: "high",
    features: [
      "Luxury Accessible Design",
      "Spacious Elevators",
      "Premium Accessible Restrooms",
      "Wide Open Spaces",
      "Trained Staff",
      "BTS Connection",
    ],
    description:
      "Ultra-luxury mall with excellent accessibility features integrated into its high-end design.",
    accessibilityScores: {
      parking: {
        name: "Parking",
        isLiked: null,
        votes: {
          like: 35,
          dislike: 4,
          notSure: 3,
        },
        description:
          "Premium accessible parking spaces with valet assistance available.",
        images: [
          {
            url: "/image/map/location/location_9/review-location/parking/parking_1.jpg",
            caption: "Premium accessible parking area",
          },
        ],
      },
      entrance: {
        name: "Main Entrance",
        isLiked: null,
        votes: {
          like: 40,
          dislike: 3,
          notSure: 2,
        },
        description:
          "Elegant, step-free entrances with wide automatic doors and attendants.",
        images: [
          {
            url: "/image/map/location/location_9/review-location/main-entrance/main-entrance_1.jpg",
            caption: "Luxurious main entrance with level access",
          },
          {
            url: "/image/map/location/location_9/review-location/main-entrance/main-entrance_2.jpg",
            caption: "Direct BTS access entrance",
          },
        ],
      },
      ramp: {
        name: "Ramps",
        isLiked: null,
        votes: {
          like: 38,
          dislike: 3,
          notSure: 4,
        },
        description:
          "Architecturally integrated ramps with high-quality finishes.",
        images: [
          {
            url: "/image/map/location/location_9/review-location/ramps/ramps_1.jpg",
            caption: "Designer ramp with premium materials",
          },
        ],
      },
      pathway: {
        name: "Pathways",
        isLiked: null,
        votes: {
          like: 45,
          dislike: 2,
          notSure: 3,
        },
        description:
          "Extremely spacious walkways with premium flooring and excellent lighting.",
        images: [
          {
            url: "/image/map/location/location_9/review-location/pathways/pathways_1.jpg",
            caption: "Wide, open shopping area with ample space",
          },
          {
            url: "/image/map/location/location_9/review-location/pathways/pathways_2.jpg",
            caption: "Luxury corridor with smooth marble flooring",
          },
        ],
      },
      elevator: {
        name: "Elevators",
        isLiked: null,
        votes: {
          like: 46,
          dislike: 2,
          notSure: 2,
        },
        description:
          "Large, designer elevators with advanced accessibility features and attendants.",
        images: [
          {
            url: "/image/map/location/location_9/review-location/elevators/elevators_1.jpg",
            caption: "Spacious luxury elevator",
          },
          {
            url: "/image/map/location/location_9/review-location/elevators/elevators_2.jpg",
            caption: "Accessible controls with premium finish",
          },
        ],
      },
      restroom: {
        name: "Restrooms",
        isLiked: null,
        votes: {
          like: 42,
          dislike: 3,
          notSure: 2,
        },
        description:
          "High-end accessible restrooms with premium fixtures and dedicated attendants.",
        images: [
          {
            url: "/image/map/location/location_9/review-location/restrooms/restrooms_1.jpg",
            caption: "Luxury accessible restroom",
          },
          {
            url: "/image/map/location/location_9/review-location/restrooms/restrooms_2.jpg",
            caption: "Premium accessible washbasins",
          },
        ],
      },
      seating: {
        name: "Seating Areas",
        isLiked: null,
        votes: {
          like: 40,
          dislike: 3,
          notSure: 2,
        },
        description:
          "Designer seating areas with accessible options throughout the mall.",
        images: [
          {
            url: "/image/map/location/location_9/review-location/seating-areas/seating-areas_1.jpg",
            caption: "Luxury lounge area with accessible seating",
          },
          {
            url: "/image/map/location/location_9/review-location/seating-areas/seating-areas_2.jpg",
            caption: "High-end rest area with space for wheelchairs",
          },
        ],
      },
      staffAssistance: {
        name: "Staff Assistance",
        isLiked: null,
        votes: {
          like: 44,
          dislike: 2,
          notSure: 3,
        },
        description:
          "Highly trained staff with dedicated accessibility concierge services.",
        images: [
          {
            url: "/image/map/location/location_9/review-location/staff-assistance/staff-assistance_1.jpg",
            caption: "Premium concierge desk with accessibility services",
          },
        ],
      },
      etc: {
        name: "Etc",
        isLiked: null,
        votes: {
          like: 36,
          dislike: 4,
          notSure: 5,
        },
        description:
          "Additional premium services including shopping assistance and wheelchair valet.",
        images: [
          {
            url: "/image/map/location/location_9/review-location/etc/etc_1.jpg",
            caption: "Shopping assistant service for wheelchair users",
          },
        ],
      },
    },
  },
  {
    id: 10,
    name: "Siam Square One",
    position: [13.7455, 100.5324],
    category: "Shopping Mall",
    accessibility: "medium",
    features: [
      "Some Accessible Entrances",
      "Elevators",
      "Limited Accessible Restrooms",
      "Some Narrow Areas",
      "BTS Connection",
    ],
    description:
      "Modern mall popular with younger crowds, offering moderate accessibility with some areas that may require assistance.",
    accessibilityScores: {
      parking: {
        name: "Parking",
        isLiked: null,
        votes: {
          like: 22,
          dislike: 18,
          notSure: 9,
        },
        description:
          "Limited accessible parking spaces that may be far from elevators.",
        images: [
          {
            url: "/image/map/location/location_10/review-location/parking/parking_1.jpg",
            caption: "Basement parking with some accessible spaces",
          },
        ],
      },
      entrance: {
        name: "Main Entrance",
        isLiked: null,
        votes: {
          like: 28,
          dislike: 15,
          notSure: 8,
        },
        description:
          "Main entrances are accessible but some side entrances have steps.",
        images: [
          {
            url: "/image/map/location/location_10/review-location/main-entrance/main-entrance_1.jpg",
            caption: "Main entrance with automatic doors",
          },
          {
            url: "/image/map/location/location_10/review-location/main-entrance/main-entrance_2.jpg",
            caption: "Side entrance with steps",
          },
        ],
      },
      ramp: {
        name: "Ramps",
        isLiked: null,
        votes: {
          like: 24,
          dislike: 16,
          notSure: 10,
        },
        description:
          "Some ramps available but may be steep or lacking handrails.",
        images: [
          {
            url: "/image/map/location/location_10/review-location/ramps/ramps_1.jpg",
            caption: "Ramp to secondary entrance",
          },
        ],
      },
      pathway: {
        name: "Pathways",
        isLiked: null,
        votes: {
          like: 25,
          dislike: 22,
          notSure: 8,
        },
        description:
          "Some pathways are narrow, especially in shops and during busy periods.",
        images: [
          {
            url: "/image/map/location/location_10/review-location/pathways/pathways_1.jpg",
            caption: "Main corridor that can get crowded",
          },
          {
            url: "/image/map/location/location_10/review-location/pathways/pathways_2.jpg",
            caption: "Some narrower areas between shops",
          },
        ],
      },
      elevator: {
        name: "Elevators",
        isLiked: null,
        votes: {
          like: 30,
          dislike: 15,
          notSure: 7,
        },
        description: "Elevators available but often crowded at peak times.",
        images: [
          {
            url: "/image/map/location/location_10/review-location/elevators/elevators_1.jpg",
            caption: "Main elevator",
          },
        ],
      },
      restroom: {
        name: "Restrooms",
        isLiked: null,
        votes: {
          like: 22,
          dislike: 18,
          notSure: 9,
        },
        description: "Some accessible restrooms but not on all floors.",
        images: [
          {
            url: "/image/map/location/location_10/review-location/restrooms/restrooms_1.jpg",
            caption: "Accessible restroom on ground floor",
          },
        ],
      },
      seating: {
        name: "Seating Areas",
        isLiked: null,
        votes: {
          like: 20,
          dislike: 15,
          notSure: 10,
        },
        description: "Limited seating areas that can be crowded.",
        images: [
          {
            url: "/image/map/location/location_10/review-location/seating-areas/seating-areas_1.jpg",
            caption: "Seating area near food court",
          },
        ],
      },
      staffAssistance: {
        name: "Staff Assistance",
        isLiked: null,
        votes: {
          like: 25,
          dislike: 10,
          notSure: 15,
        },
        description:
          "Staff generally helpful but limited specialized accessibility assistance.",
        images: [
          {
            url: "/image/map/location/location_10/review-location/staff-assistance/staff-assistance_1.jpg",
            caption: "Information counter",
          },
        ],
      },
      etc: {
        name: "Etc",
        isLiked: null,
        votes: {
          like: 18,
          dislike: 15,
          notSure: 12,
        },
        description:
          "Some shops have narrow entrances or internal steps that limit accessibility.",
        images: [
          {
            url: "/image/map/location/location_10/review-location/etc/etc_1.jpg",
            caption: "Shop with narrow entrance",
          },
        ],
      },
    },
  },
  {
    id: 11,
    name: "Bangkok Art and Culture Centre",
    position: [13.7466, 100.5308],
    category: "Shopping Mall",
    accessibility: "high",
    features: [
      "Art exhibitions",
      "Accessible Toilets",
      "Wide Pathways",
      "Elevators",
      "Wheelchair Access",
      "Rest Areas",
      "Direct BTS/MRT Access",
    ],
    description:
      "Cultural center with full accessibility and direct BTS connection.",
    accessibilityScores: {
      parking: {
        name: "Parking",
        isLiked: null,
        votes: { like: 30, dislike: 5, notSure: 3 },
        description: "Accessible parking near entrance",
        images: [
          {
            url: "/image/map/location/location_11/review-location/parking/parking_1.jpg",
            caption: "Accessible parking near entrance",
          },
        ],
      },
      entrance: {
        name: "Entrance",
        isLiked: null,
        votes: { like: 30, dislike: 5, notSure: 3 },
        description: "Step-free entrance with automatic doors",
        images: [
          {
            url: "/image/map/location/location_11/review-location/main-entrance/main-entrance_1.jpg",
            caption: "Step-free entrance with automatic doors",
          },
        ],
      },
      ramp: {
        name: "Ramp",
        isLiked: null,
        votes: { like: 30, dislike: 5, notSure: 3 },
        description: "Gentle ramps with handrails",
        images: [
          {
            url: "/image/map/location/location_11/review-location/ramps/ramps_1.jpg",
            caption: "Gentle ramps with handrails",
          },
        ],
      },
      pathway: {
        name: "Pathway",
        isLiked: null,
        votes: { like: 30, dislike: 5, notSure: 3 },
        description: "Wide corridors with clear signs",
        images: [
          {
            url: "/image/map/location/location_11/review-location/pathways/pathways_1.jpg",
            caption: "Wide corridors with clear signs",
          },
        ],
      },
      elevator: {
        name: "Elevator",
        isLiked: null,
        votes: { like: 30, dislike: 5, notSure: 3 },
        description: "Large elevators with accessibility features",
        images: [
          {
            url: "/image/map/location/location_11/review-location/elevators/elevators_1.jpg",
            caption: "Large elevators with accessibility features",
          },
        ],
      },
      restroom: {
        name: "Restroom",
        isLiked: null,
        votes: { like: 30, dislike: 5, notSure: 3 },
        description: "Accessible restrooms on all floors",
        images: [
          {
            url: "/image/map/location/location_11/review-location/restrooms/restrooms_1.jpg",
            caption: "Accessible restrooms on all floors",
          },
        ],
      },
      seating: {
        name: "Seating",
        isLiked: null,
        votes: { like: 30, dislike: 5, notSure: 3 },
        description: "Rest areas with space for wheelchairs",
        images: [
          {
            url: "/image/map/location/location_11/review-location/seating-areas/seating-areas_1.jpg",
            caption: "Rest areas with space for wheelchairs",
          },
        ],
      },
      staffAssistance: {
        name: "Staff Assistance",
        isLiked: null,
        votes: { like: 30, dislike: 5, notSure: 3 },
        description: "Staff trained for accessibility support",
        images: [
          {
            url: "/image/map/location/location_11/review-location/staff-assistance/staff-assistance_1.jpg",
            caption: "Staff trained for accessibility support",
          },
        ],
      },
      etc: {
        name: "Etc",
        isLiked: null,
        votes: { like: 30, dislike: 5, notSure: 3 },
        description: "Additional helpful features",
        images: [
          {
            url: "/image/map/location/location_11/review-location/etc/etc_1.jpg",
            caption: "Additional helpful features",
          },
        ],
      },
    },
  },
  {
    id: 12,
    name: "The Market Bangkok",
    position: [13.7506, 100.5409],
    category: "Shopping Mall",
    accessibility: "high",
    features: [
      "Art exhibitions",
      "Accessible Toilets",
      "Wide Pathways",
      "Elevators",
      "Wheelchair Access",
      "Rest Areas",
      "Direct BTS/MRT Access",
    ],
    description:
      "Modern lifestyle mall near Pratunam with full accessibility support.",
    accessibilityScores: {
      parking: {
        name: "Parking",
        isLiked: null,
        votes: { like: 31, dislike: 5, notSure: 3 },
        description: "Accessible parking near entrance",
        images: [
          {
            url: "/image/map/location/location_12/review-location/parking/parking_1.jpg",
            caption: "Accessible parking near entrance",
          },
        ],
      },
      entrance: {
        name: "Entrance",
        isLiked: null,
        votes: { like: 31, dislike: 5, notSure: 3 },
        description: "Step-free entrance with automatic doors",
        images: [
          {
            url: "/image/map/location/location_12/review-location/main-entrance/main-entrance_1.jpg",
            caption: "Step-free entrance with automatic doors",
          },
        ],
      },
      ramp: {
        name: "Ramp",
        isLiked: null,
        votes: { like: 31, dislike: 5, notSure: 3 },
        description: "Gentle ramps with handrails",
        images: [
          {
            url: "/image/map/location/location_12/review-location/ramps/ramps_1.jpg",
            caption: "Gentle ramps with handrails",
          },
        ],
      },
      pathway: {
        name: "Pathway",
        isLiked: null,
        votes: { like: 31, dislike: 5, notSure: 3 },
        description: "Wide corridors with clear signs",
        images: [
          {
            url: "/image/map/location/location_12/review-location/pathways/pathways_1.jpg",
            caption: "Wide corridors with clear signs",
          },
        ],
      },
      elevator: {
        name: "Elevator",
        isLiked: null,
        votes: { like: 31, dislike: 5, notSure: 3 },
        description: "Large elevators with accessibility features",
        images: [
          {
            url: "/image/map/location/location_12/review-location/elevators/elevators_1.jpg",
            caption: "Large elevators with accessibility features",
          },
        ],
      },
      restroom: {
        name: "Restroom",
        isLiked: null,
        votes: { like: 31, dislike: 5, notSure: 3 },
        description: "Accessible restrooms on all floors",
        images: [
          {
            url: "/image/map/location/location_12/review-location/restrooms/restrooms_1.jpg",
            caption: "Accessible restrooms on all floors",
          },
        ],
      },
      seating: {
        name: "Seating",
        isLiked: null,
        votes: { like: 31, dislike: 5, notSure: 3 },
        description: "Rest areas with space for wheelchairs",
        images: [
          {
            url: "/image/map/location/location_12/review-location/seating-areas/seating-areas_1.jpg",
            caption: "Rest areas with space for wheelchairs",
          },
        ],
      },
      staffAssistance: {
        name: "Staff Assistance",
        isLiked: null,
        votes: { like: 31, dislike: 5, notSure: 3 },
        description: "Staff trained for accessibility support",
        images: [
          {
            url: "/image/map/location/location_12/review-location/staff-assistance/staff-assistance_1.jpg",
            caption: "Staff trained for accessibility support",
          },
        ],
      },
      etc: {
        name: "Etc",
        isLiked: null,
        votes: { like: 31, dislike: 5, notSure: 3 },
        description: "Additional helpful features",
        images: [
          {
            url: "/image/map/location/location_12/review-location/etc/etc_1.jpg",
            caption: "Additional helpful features",
          },
        ],
      },
    },
  },
  // ⬇️ เริ่มต้นด้วย Union Mall
  {
    id: 13,
    name: "Union Mall",
    position: [13.8185, 100.5618],
    category: "Shopping Mall",
    accessibility: "high",
    features: [
      "Art exhibitions",
      "Accessible Toilets",
      "Wide Pathways",
      "Elevators",
      "Wheelchair Access",
      "Rest Areas",
      "Direct BTS/MRT Access",
    ],
    description:
      "Youthful shopping mall with all accessibility features fully implemented.",
    accessibilityScores: {
      parking: {
        name: "Parking",
        isLiked: null,
        votes: { like: 32, dislike: 5, notSure: 3 },
        description: "Accessible parking near entrance",
        images: [
          {
            url: "/image/map/location/location_13/review-location/parking/parking_1.jpg",
            caption: "Accessible parking near entrance",
          },
        ],
      },
      entrance: {
        name: "Entrance",
        isLiked: null,
        votes: { like: 32, dislike: 5, notSure: 3 },
        description: "Step-free entrance with automatic doors",
        images: [
          {
            url: "/image/map/location/location_13/review-location/main-entrance/main-entrance_1.jpg",
            caption: "Step-free entrance with automatic doors",
          },
        ],
      },
      ramp: {
        name: "Ramp",
        isLiked: null,
        votes: { like: 32, dislike: 5, notSure: 3 },
        description: "Gentle ramps with handrails",
        images: [
          {
            url: "/image/map/location/location_13/review-location/ramps/ramps_1.jpg",
            caption: "Gentle ramps with handrails",
          },
        ],
      },
      pathway: {
        name: "Pathway",
        isLiked: null,
        votes: { like: 32, dislike: 5, notSure: 3 },
        description: "Wide corridors with clear signs",
        images: [
          {
            url: "/image/map/location/location_13/review-location/pathways/pathways_1.jpg",
            caption: "Wide corridors with clear signs",
          },
        ],
      },
      elevator: {
        name: "Elevator",
        isLiked: null,
        votes: { like: 32, dislike: 5, notSure: 3 },
        description: "Large elevators with accessibility features",
        images: [
          {
            url: "/image/map/location/location_13/review-location/elevators/elevators_1.jpg",
            caption: "Large elevators with accessibility features",
          },
        ],
      },
      restroom: {
        name: "Restroom",
        isLiked: null,
        votes: { like: 32, dislike: 5, notSure: 3 },
        description: "Accessible restrooms on all floors",
        images: [
          {
            url: "/image/map/location/location_13/review-location/restrooms/restrooms_1.jpg",
            caption: "Accessible restrooms on all floors",
          },
        ],
      },
      seating: {
        name: "Seating",
        isLiked: null,
        votes: { like: 32, dislike: 5, notSure: 3 },
        description: "Rest areas with space for wheelchairs",
        images: [
          {
            url: "/image/map/location/location_13/review-location/seating-areas/seating-areas_1.jpg",
            caption: "Rest areas with space for wheelchairs",
          },
        ],
      },
      staffAssistance: {
        name: "Staff Assistance",
        isLiked: null,
        votes: { like: 32, dislike: 5, notSure: 3 },
        description: "Staff trained for accessibility support",
        images: [
          {
            url: "/image/map/location/location_13/review-location/staff-assistance/staff-assistance_1.jpg",
            caption: "Staff trained for accessibility support",
          },
        ],
      },
      etc: {
        name: "Etc",
        isLiked: null,
        votes: { like: 32, dislike: 5, notSure: 3 },
        description: "Additional helpful features",
        images: [
          {
            url: "/image/map/location/location_13/review-location/etc/etc_1.jpg",
            caption: "Additional helpful features",
          },
        ],
      },
    },
  },
  {
    id: 14,
    name: "Gateway Ekamai",
    position: [13.7191, 100.5865],
    category: "Shopping Mall",
    accessibility: "high",
    features: [
      "Art exhibitions",
      "Accessible Toilets",
      "Wide Pathways",
      "Elevators",
      "Wheelchair Access",
      "Rest Areas",
      "Direct BTS/MRT Access",
    ],
    description: "Japanese-themed mall with excellent universal design.",
    accessibilityScores: {
      parking: {
        name: "Parking",
        isLiked: null,
        votes: { like: 33, dislike: 5, notSure: 3 },
        description: "Accessible parking near entrance",
        images: [
          {
            url: "/image/map/location/location_14/review-location/parking/parking_1.jpg",
            caption: "Accessible parking near entrance",
          },
        ],
      },
      entrance: {
        name: "Entrance",
        isLiked: null,
        votes: { like: 33, dislike: 5, notSure: 3 },
        description: "Step-free entrance with automatic doors",
        images: [
          {
            url: "/image/map/location/location_14/review-location/main-entrance/main-entrance_1.jpg",
            caption: "Step-free entrance with automatic doors",
          },
        ],
      },
      ramp: {
        name: "Ramp",
        isLiked: null,
        votes: { like: 33, dislike: 5, notSure: 3 },
        description: "Gentle ramps with handrails",
        images: [
          {
            url: "/image/map/location/location_14/review-location/ramps/ramps_1.jpg",
            caption: "Gentle ramps with handrails",
          },
        ],
      },
      pathway: {
        name: "Pathway",
        isLiked: null,
        votes: { like: 33, dislike: 5, notSure: 3 },
        description: "Wide corridors with clear signs",
        images: [
          {
            url: "/image/map/location/location_14/review-location/pathways/pathways_1.jpg",
            caption: "Wide corridors with clear signs",
          },
        ],
      },
      elevator: {
        name: "Elevator",
        isLiked: null,
        votes: { like: 33, dislike: 5, notSure: 3 },
        description: "Large elevators with accessibility features",
        images: [
          {
            url: "/image/map/location/location_14/review-location/elevators/elevators_1.jpg",
            caption: "Large elevators with accessibility features",
          },
        ],
      },
      restroom: {
        name: "Restroom",
        isLiked: null,
        votes: { like: 33, dislike: 5, notSure: 3 },
        description: "Accessible restrooms on all floors",
        images: [
          {
            url: "/image/map/location/location_14/review-location/restrooms/restrooms_1.jpg",
            caption: "Accessible restrooms on all floors",
          },
        ],
      },
      seating: {
        name: "Seating",
        isLiked: null,
        votes: { like: 33, dislike: 5, notSure: 3 },
        description: "Rest areas with space for wheelchairs",
        images: [
          {
            url: "/image/map/location/location_14/review-location/seating-areas/seating-areas_1.jpg",
            caption: "Rest areas with space for wheelchairs",
          },
        ],
      },
      staffAssistance: {
        name: "Staff Assistance",
        isLiked: null,
        votes: { like: 33, dislike: 5, notSure: 3 },
        description: "Staff trained for accessibility support",
        images: [
          {
            url: "/image/map/location/location_14/review-location/staff-assistance/staff-assistance_1.jpg",
            caption: "Staff trained for accessibility support",
          },
        ],
      },
      etc: {
        name: "Etc",
        isLiked: null,
        votes: { like: 33, dislike: 5, notSure: 3 },
        description: "Additional helpful features",
        images: [
          {
            url: "/image/map/location/location_14/review-location/etc/etc_1.jpg",
            caption: "Additional helpful features",
          },
        ],
      },
    },
  },
  {
    id: 15,
    name: "Mega Bangna",
    position: [13.6401, 100.6809],
    category: "Shopping Mall",
    accessibility: "high",
    features: [
      "Art exhibitions",
      "Accessible Toilets",
      "Wide Pathways",
      "Elevators",
      "Wheelchair Access",
      "Rest Areas",
      "Direct BTS/MRT Access",
    ],
    description:
      "Large-scale lifestyle mall with extensive accessibility features.",
    accessibilityScores: {
      parking: {
        name: "Parking",
        isLiked: null,
        votes: { like: 34, dislike: 5, notSure: 3 },
        description: "Accessible parking near entrance",
        images: [
          {
            url: "/image/map/location/location_15/review-location/parking/parking_1.jpg",
            caption: "Accessible parking near entrance",
          },
        ],
      },
      entrance: {
        name: "Entrance",
        isLiked: null,
        votes: { like: 34, dislike: 5, notSure: 3 },
        description: "Step-free entrance with automatic doors",
        images: [
          {
            url: "/image/map/location/location_15/review-location/main-entrance/main-entrance_1.jpg",
            caption: "Step-free entrance with automatic doors",
          },
        ],
      },
      ramp: {
        name: "Ramp",
        isLiked: null,
        votes: { like: 34, dislike: 5, notSure: 3 },
        description: "Gentle ramps with handrails",
        images: [
          {
            url: "/image/map/location/location_15/review-location/ramps/ramps_1.jpg",
            caption: "Gentle ramps with handrails",
          },
        ],
      },
      pathway: {
        name: "Pathway",
        isLiked: null,
        votes: { like: 34, dislike: 5, notSure: 3 },
        description: "Wide corridors with clear signs",
        images: [
          {
            url: "/image/map/location/location_15/review-location/pathways/pathways_1.jpg",
            caption: "Wide corridors with clear signs",
          },
        ],
      },
      elevator: {
        name: "Elevator",
        isLiked: null,
        votes: { like: 34, dislike: 5, notSure: 3 },
        description: "Large elevators with accessibility features",
        images: [
          {
            url: "/image/map/location/location_15/review-location/elevators/elevators_1.jpg",
            caption: "Large elevators with accessibility features",
          },
        ],
      },
      restroom: {
        name: "Restroom",
        isLiked: null,
        votes: { like: 34, dislike: 5, notSure: 3 },
        description: "Accessible restrooms on all floors",
        images: [
          {
            url: "/image/map/location/location_15/review-location/restrooms/restrooms_1.jpg",
            caption: "Accessible restrooms on all floors",
          },
        ],
      },
      seating: {
        name: "Seating",
        isLiked: null,
        votes: { like: 34, dislike: 5, notSure: 3 },
        description: "Rest areas with space for wheelchairs",
        images: [
          {
            url: "/image/map/location/location_15/review-location/seating-areas/seating-areas_1.jpg",
            caption: "Rest areas with space for wheelchairs",
          },
        ],
      },
      staffAssistance: {
        name: "Staff Assistance",
        isLiked: null,
        votes: { like: 34, dislike: 5, notSure: 3 },
        description: "Staff trained for accessibility support",
        images: [
          {
            url: "/image/map/location/location_15/review-location/staff-assistance/staff-assistance_1.jpg",
            caption: "Staff trained for accessibility support",
          },
        ],
      },
      etc: {
        name: "Etc",
        isLiked: null,
        votes: { like: 34, dislike: 5, notSure: 3 },
        description: "Additional helpful features",
        images: [
          {
            url: "/image/map/location/location_15/review-location/etc/etc_1.jpg",
            caption: "Additional helpful features",
          },
        ],
      },
    },
  },
  {
    id: 16,
    name: "Lotus Onnut",
    position: [13.705, 100.602],
    category: "Shopping Mall",
    accessibility: "medium",
    features: [
      "Parking",
      "Ramp",
      "Entrance",
      "Elevator",
      "Restroom",
      "Customer Service",
    ],
    description:
      "Supermarket with decent accessibility but some limitations in pathways and rest areas.",
    accessibilityScores: {
      parking: {
        name: "Parking",
        isLiked: null,
        votes: { like: 25, dislike: 5, notSure: 3 },
        description: "Accessible parking",
        images: [
          {
            url: "/image/map/location/location_16/review-location/parking/parking_1.jpg",
            caption: "Accessible parking example",
          },
        ],
      },
      entrance: {
        name: "Entrance",
        isLiked: null,
        votes: { like: 25, dislike: 5, notSure: 3 },
        description: "Accessible entrance",
        images: [
          {
            url: "/image/map/location/location_16/review-location/entrance/entrance_1.jpg",
            caption: "Accessible entrance example",
          },
        ],
      },
      ramp: {
        name: "Ramp",
        isLiked: null,
        votes: { like: 10, dislike: 15, notSure: 3 },
        description: "Limited ramp",
        images: [
          {
            url: "/image/map/location/location_16/review-location/ramp/ramp_1.jpg",
            caption: "Limited ramp example",
          },
        ],
      },
      pathway: {
        name: "Pathway",
        isLiked: null,
        votes: { like: 10, dislike: 15, notSure: 3 },
        description: "Limited pathway",
        images: [
          {
            url: "/image/map/location/location_16/review-location/pathway/pathway_1.jpg",
            caption: "Limited pathway example",
          },
        ],
      },
      elevator: {
        name: "Elevator",
        isLiked: null,
        votes: { like: 25, dislike: 5, notSure: 3 },
        description: "Accessible elevator",
        images: [
          {
            url: "/image/map/location/location_16/review-location/elevator/elevator_1.jpg",
            caption: "Accessible elevator example",
          },
        ],
      },
      restroom: {
        name: "Restroom",
        isLiked: null,
        votes: { like: 25, dislike: 5, notSure: 3 },
        description: "Accessible restroom",
        images: [
          {
            url: "/image/map/location/location_16/review-location/restroom/restroom_1.jpg",
            caption: "Accessible restroom example",
          },
        ],
      },
      seating: {
        name: "Seating",
        isLiked: null,
        votes: { like: 10, dislike: 15, notSure: 3 },
        description: "Limited seating",
        images: [
          {
            url: "/image/map/location/location_16/review-location/seating/seating_1.jpg",
            caption: "Limited seating example",
          },
        ],
      },
      staffAssistance: {
        name: "Staff Assistance",
        isLiked: null,
        votes: { like: 15, dislike: 10, notSure: 5 },
        description: "staffAssistance feature detail",
        images: [
          {
            url: "/image/map/location/location_16/review-location/staffAssistance/staffAssistance_1.jpg",
            caption: "staffAssistance support",
          },
        ],
      },
      etc: {
        name: "Etc",
        isLiked: null,
        votes: { like: 15, dislike: 10, notSure: 5 },
        description: "etc feature detail",
        images: [
          {
            url: "/image/map/location/location_16/review-location/etc/etc_1.jpg",
            caption: "etc support",
          },
        ],
      },
    },
  },

  {
    id: 17,
    name: "Lotus Onnut",
    position: [13.705, 100.602],
    category: "Shopping Mall",
    accessibility: "medium",
    features: [
      "Parking",
      "Ramp",
      "Entrance",
      "Elevator",
      "Restroom",
      "Customer Service",
    ],
    description:
      "Supermarket with decent accessibility but some limitations in pathways and rest areas.",
    accessibilityScores: {
      parking: {
        name: "Parking",
        isLiked: null,
        votes: { like: 25, dislike: 5, notSure: 3 },
        description: "Accessible parking",
        images: [
          {
            url: "/image/map/location/location_16/review-location/parking/parking_1.jpg",
            caption: "Accessible parking example",
          },
        ],
      },
      entrance: {
        name: "Entrance",
        isLiked: null,
        votes: { like: 25, dislike: 5, notSure: 3 },
        description: "Accessible entrance",
        images: [
          {
            url: "/image/map/location/location_16/review-location/entrance/entrance_1.jpg",
            caption: "Accessible entrance example",
          },
        ],
      },
      ramp: {
        name: "Ramp",
        isLiked: null,
        votes: { like: 10, dislike: 15, notSure: 3 },
        description: "Limited ramp",
        images: [
          {
            url: "/image/map/location/location_16/review-location/ramp/ramp_1.jpg",
            caption: "Limited ramp example",
          },
        ],
      },
      pathway: {
        name: "Pathway",
        isLiked: null,
        votes: { like: 10, dislike: 15, notSure: 3 },
        description: "Limited pathway",
        images: [
          {
            url: "/image/map/location/location_16/review-location/pathway/pathway_1.jpg",
            caption: "Limited pathway example",
          },
        ],
      },
      elevator: {
        name: "Elevator",
        isLiked: null,
        votes: { like: 25, dislike: 5, notSure: 3 },
        description: "Accessible elevator",
        images: [
          {
            url: "/image/map/location/location_16/review-location/elevator/elevator_1.jpg",
            caption: "Accessible elevator example",
          },
        ],
      },
      restroom: {
        name: "Restroom",
        isLiked: null,
        votes: { like: 25, dislike: 5, notSure: 3 },
        description: "Accessible restroom",
        images: [
          {
            url: "/image/map/location/location_16/review-location/restroom/restroom_1.jpg",
            caption: "Accessible restroom example",
          },
        ],
      },
      seating: {
        name: "Seating",
        isLiked: null,
        votes: { like: 10, dislike: 15, notSure: 3 },
        description: "Limited seating",
        images: [
          {
            url: "/image/map/location/location_16/review-location/seating/seating_1.jpg",
            caption: "Limited seating example",
          },
        ],
      },
      staffAssistance: {
        name: "Staffassistance",
        isLiked: null,
        votes: { like: 15, dislike: 10, notSure: 5 },
        description: "staffAssistance feature detail",
        images: [
          {
            url: "/image/map/location/location_16/review-location/staffAssistance/staffAssistance_1.jpg",
            caption: "staffAssistance support",
          },
        ],
      },
      etc: {
        name: "Etc",
        isLiked: null,
        votes: { like: 15, dislike: 10, notSure: 5 },
        description: "etc feature detail",
        images: [
          {
            url: "/image/map/location/location_16/review-location/etc/etc_1.jpg",
            caption: "etc support",
          },
        ],
      },
    },
  },

  {
    id: 18,
    name: "Big C Ratchada",
    position: [13.7702, 100.5713],
    category: "Shopping Mall",
    accessibility: "medium",
    features: [
      "Parking",
      "Ramp",
      "Entrance",
      "Elevator",
      "Restroom",
      "Customer Service",
    ],
    description:
      "Big C branch with good entry and parking support, but some issues in seating and pathway access.",
    accessibilityScores: {
      parking: {
        name: "Parking",
        isLiked: null,
        votes: { like: 25, dislike: 5, notSure: 3 },
        description: "Accessible parking",
        images: [
          {
            url: "/image/map/location/location_17/review-location/parking/parking_1.jpg",
            caption: "Accessible parking example",
          },
        ],
      },
      entrance: {
        name: "Entrance",
        isLiked: null,
        votes: { like: 25, dislike: 5, notSure: 3 },
        description: "Accessible entrance",
        images: [
          {
            url: "/image/map/location/location_17/review-location/entrance/entrance_1.jpg",
            caption: "Accessible entrance example",
          },
        ],
      },
      ramp: {
        name: "Ramp",
        isLiked: null,
        votes: { like: 25, dislike: 5, notSure: 3 },
        description: "Accessible ramp",
        images: [
          {
            url: "/image/map/location/location_17/review-location/ramp/ramp_1.jpg",
            caption: "Accessible ramp example",
          },
        ],
      },
      pathway: {
        name: "Pathway",
        isLiked: null,
        votes: { like: 10, dislike: 15, notSure: 3 },
        description: "Limited pathway",
        images: [
          {
            url: "/image/map/location/location_17/review-location/pathway/pathway_1.jpg",
            caption: "Limited pathway example",
          },
        ],
      },
      elevator: {
        name: "Elevator",
        isLiked: null,
        votes: { like: 25, dislike: 5, notSure: 3 },
        description: "Accessible elevator",
        images: [
          {
            url: "/image/map/location/location_17/review-location/elevator/elevator_1.jpg",
            caption: "Accessible elevator example",
          },
        ],
      },
      restroom: {
        name: "Restroom",
        isLiked: null,
        votes: { like: 10, dislike: 15, notSure: 3 },
        description: "Limited restroom",
        images: [
          {
            url: "/image/map/location/location_17/review-location/restroom/restroom_1.jpg",
            caption: "Limited restroom example",
          },
        ],
      },
      seating: {
        name: "Seating",
        isLiked: null,
        votes: { like: 10, dislike: 15, notSure: 3 },
        description: "Limited seating",
        images: [
          {
            url: "/image/map/location/location_17/review-location/seating/seating_1.jpg",
            caption: "Limited seating example",
          },
        ],
      },
      staffAssistance: {
        name: "Staffassistance",
        isLiked: null,
        votes: { like: 15, dislike: 10, notSure: 5 },
        description: "staffAssistance feature detail",
        images: [
          {
            url: "/image/map/location/location_17/review-location/staffAssistance/staffAssistance_1.jpg",
            caption: "staffAssistance support",
          },
        ],
      },
      etc: {
        name: "Etc",
        isLiked: null,
        votes: { like: 15, dislike: 10, notSure: 5 },
        description: "etc feature detail",
        images: [
          {
            url: "/image/map/location/location_17/review-location/etc/etc_1.jpg",
            caption: "etc support",
          },
        ],
      },
    },
  },

  {
    id: 19,
    name: "Lotus Rama 4",
    position: [13.7208, 100.5416],
    category: "Shopping Mall",
    accessibility: "medium",
    features: [
      "Parking",
      "Ramp",
      "Entrance",
      "Elevator",
      "Restroom",
      "Customer Service",
    ],
    description:
      "Branch with strong elevator and entrance accessibility, but missing rest areas.",
    accessibilityScores: {
      parking: {
        name: "Parking",
        isLiked: null,
        votes: { like: 25, dislike: 5, notSure: 3 },
        description: "Accessible parking",
        images: [
          {
            url: "/image/map/location/location_18/review-location/parking/parking_1.jpg",
            caption: "Accessible parking example",
          },
        ],
      },
      entrance: {
        name: "Entrance",
        isLiked: null,
        votes: { like: 25, dislike: 5, notSure: 3 },
        description: "Accessible entrance",
        images: [
          {
            url: "/image/map/location/location_18/review-location/entrance/entrance_1.jpg",
            caption: "Accessible entrance example",
          },
        ],
      },
      ramp: {
        name: "Ramp",
        isLiked: null,
        votes: { like: 10, dislike: 15, notSure: 3 },
        description: "Limited ramp",
        images: [
          {
            url: "/image/map/location/location_18/review-location/ramp/ramp_1.jpg",
            caption: "Limited ramp example",
          },
        ],
      },
      pathway: {
        name: "Pathway",
        isLiked: null,
        votes: { like: 25, dislike: 5, notSure: 3 },
        description: "Accessible pathway",
        images: [
          {
            url: "/image/map/location/location_18/review-location/pathway/pathway_1.jpg",
            caption: "Accessible pathway example",
          },
        ],
      },
      elevator: {
        name: "Elevator",
        isLiked: null,
        votes: { like: 25, dislike: 5, notSure: 3 },
        description: "Accessible elevator",
        images: [
          {
            url: "/image/map/location/location_18/review-location/elevator/elevator_1.jpg",
            caption: "Accessible elevator example",
          },
        ],
      },
      restroom: {
        name: "Restroom",
        isLiked: null,
        votes: { like: 10, dislike: 15, notSure: 3 },
        description: "Limited restroom",
        images: [
          {
            url: "/image/map/location/location_18/review-location/restroom/restroom_1.jpg",
            caption: "Limited restroom example",
          },
        ],
      },
      seating: {
        name: "Seating",
        isLiked: null,
        votes: { like: 10, dislike: 15, notSure: 3 },
        description: "Limited seating",
        images: [
          {
            url: "/image/map/location/location_18/review-location/seating/seating_1.jpg",
            caption: "Limited seating example",
          },
        ],
      },
      staffAssistance: {
        name: "Staffassistance",
        isLiked: null,
        votes: { like: 15, dislike: 10, notSure: 5 },
        description: "staffAssistance feature detail",
        images: [
          {
            url: "/image/map/location/location_18/review-location/staffAssistance/staffAssistance_1.jpg",
            caption: "staffAssistance support",
          },
        ],
      },
      etc: {
        name: "Etc",
        isLiked: null,
        votes: { like: 15, dislike: 10, notSure: 5 },
        description: "etc feature detail",
        images: [
          {
            url: "/image/map/location/location_18/review-location/etc/etc_1.jpg",
            caption: "etc support",
          },
        ],
      },
    },
  },
  {
    id: 20,
    name: "Local Market Rama 3",
    position: [13.691, 100.5405],
    category: "Shopping Mall",
    accessibility: "low",
    features: ["Parking", "Entrance", "Customer Service"],
    description:
      "Small market with minimal accessibility support, mostly non-wheelchair friendly.",
    accessibilityScores: {
      parking: {
        name: "Parking",
        isLiked: null,
        votes: { like: 25, dislike: 5, notSure: 3 },
        description: "Accessible parking",
        images: [
          {
            url: "/image/map/location/location_19/review-location/parking/parking_1.jpg",
            caption: "Accessible parking example",
          },
        ],
      },
      entrance: {
        name: "Entrance",
        isLiked: null,
        votes: { like: 25, dislike: 5, notSure: 3 },
        description: "Accessible entrance",
        images: [
          {
            url: "/image/map/location/location_19/review-location/entrance/entrance_1.jpg",
            caption: "Accessible entrance example",
          },
        ],
      },
      ramp: {
        name: "Ramp",
        isLiked: null,
        votes: { like: 10, dislike: 20, notSure: 3 },
        description: "Not accessible ramp",
        images: [
          {
            url: "/image/map/location/location_19/review-location/ramp/ramp_1.jpg",
            caption: "Not accessible ramp example",
          },
        ],
      },
      pathway: {
        name: "Pathway",
        isLiked: null,
        votes: { like: 10, dislike: 20, notSure: 3 },
        description: "Not accessible pathway",
        images: [
          {
            url: "/image/map/location/location_19/review-location/pathway/pathway_1.jpg",
            caption: "Not accessible pathway example",
          },
        ],
      },
      elevator: {
        name: "Elevator",
        isLiked: null,
        votes: { like: 10, dislike: 20, notSure: 3 },
        description: "Not accessible elevator",
        images: [
          {
            url: "/image/map/location/location_19/review-location/elevator/elevator_1.jpg",
            caption: "Not accessible elevator example",
          },
        ],
      },
      restroom: {
        name: "Restroom",
        isLiked: null,
        votes: { like: 10, dislike: 20, notSure: 3 },
        description: "Not accessible restroom",
        images: [
          {
            url: "/image/map/location/location_19/review-location/restroom/restroom_1.jpg",
            caption: "Not accessible restroom example",
          },
        ],
      },
      seating: {
        name: "Seating",
        isLiked: null,
        votes: { like: 10, dislike: 20, notSure: 3 },
        description: "Not accessible seating",
        images: [
          {
            url: "/image/map/location/location_19/review-location/seating/seating_1.jpg",
            caption: "Not accessible seating example",
          },
        ],
      },
      staffAssistance: {
        name: "Staffassistance",
        isLiked: null,
        votes: { like: 15, dislike: 10, notSure: 5 },
        description: "staffAssistance feature detail",
        images: [
          {
            url: "/image/map/location/location_19/review-location/staffAssistance/staffAssistance_1.jpg",
            caption: "staffAssistance support",
          },
        ],
      },
      etc: {
        name: "Etc",
        isLiked: null,
        votes: { like: 15, dislike: 10, notSure: 5 },
        description: "etc feature detail",
        images: [
          {
            url: "/image/map/location/location_19/review-location/etc/etc_1.jpg",
            caption: "etc support",
          },
        ],
      },
    },
  },

  {
    id: 21,
    name: "Community Mall Bangkapi",
    position: [13.7685, 100.6479],
    category: "Shopping Mall",
    accessibility: "low",
    features: ["Parking", "Entrance", "Customer Service"],
    description:
      "Community space with challenging layout for wheelchair users.",
    accessibilityScores: {
      parking: {
        name: "Parking",
        isLiked: null,
        votes: { like: 10, dislike: 20, notSure: 3 },
        description: "Not accessible parking",
        images: [
          {
            url: "/image/map/location/location_20/review-location/parking/parking_1.jpg",
            caption: "Not accessible parking example",
          },
        ],
      },
      entrance: {
        name: "Entrance",
        isLiked: null,
        votes: { like: 10, dislike: 20, notSure: 3 },
        description: "Not accessible entrance",
        images: [
          {
            url: "/image/map/location/location_20/review-location/entrance/entrance_1.jpg",
            caption: "Not accessible entrance example",
          },
        ],
      },
      ramp: {
        name: "Ramp",
        isLiked: null,
        votes: { like: 10, dislike: 20, notSure: 3 },
        description: "Not accessible ramp",
        images: [
          {
            url: "/image/map/location/location_20/review-location/ramp/ramp_1.jpg",
            caption: "Not accessible ramp example",
          },
        ],
      },
      pathway: {
        name: "Pathway",
        isLiked: null,
        votes: { like: 10, dislike: 20, notSure: 3 },
        description: "Not accessible pathway",
        images: [
          {
            url: "/image/map/location/location_20/review-location/pathway/pathway_1.jpg",
            caption: "Not accessible pathway example",
          },
        ],
      },
      elevator: {
        name: "Elevator",
        isLiked: null,
        votes: { like: 25, dislike: 5, notSure: 3 },
        description: "Accessible elevator",
        images: [
          {
            url: "/image/map/location/location_20/review-location/elevator/elevator_1.jpg",
            caption: "Accessible elevator example",
          },
        ],
      },
      restroom: {
        name: "Restroom",
        isLiked: null,
        votes: { like: 10, dislike: 20, notSure: 3 },
        description: "Not accessible restroom",
        images: [
          {
            url: "/image/map/location/location_20/review-location/restroom/restroom_1.jpg",
            caption: "Not accessible restroom example",
          },
        ],
      },
      seating: {
        name: "Seating",
        isLiked: null,
        votes: { like: 10, dislike: 20, notSure: 3 },
        description: "Not accessible seating",
        images: [
          {
            url: "/image/map/location/location_20/review-location/seating/seating_1.jpg",
            caption: "Not accessible seating example",
          },
        ],
      },
      staffAssistance: {
        name: "Staffassistance",
        isLiked: null,
        votes: { like: 15, dislike: 10, notSure: 5 },
        description: "staffAssistance feature detail",
        images: [
          {
            url: "/image/map/location/location_20/review-location/staffAssistance/staffAssistance_1.jpg",
            caption: "staffAssistance support",
          },
        ],
      },
      etc: {
        name: "Etc",
        isLiked: null,
        votes: { like: 15, dislike: 10, notSure: 5 },
        description: "etc feature detail",
        images: [
          {
            url: "/image/map/location/location_20/review-location/etc/etc_1.jpg",
            caption: "etc support",
          },
        ],
      },
    },
  },

  {
    id: 22,
    name: "Fresh Mart Kaset",
    position: [13.8453, 100.5714],
    category: "Shopping Mall",
    accessibility: "low",
    features: ["Parking", "Entrance", "Customer Service"],
    description:
      "Limited infrastructure for disabled users, with multiple physical barriers.",
    accessibilityScores: {
      parking: {
        name: "Parking",
        isLiked: null,
        votes: { like: 25, dislike: 5, notSure: 3 },
        description: "Accessible parking",
        images: [
          {
            url: "/image/map/location/location_21/review-location/parking/parking_1.jpg",
            caption: "Accessible parking example",
          },
        ],
      },
      entrance: {
        name: "Entrance",
        isLiked: null,
        votes: { like: 10, dislike: 20, notSure: 3 },
        description: "Not accessible entrance",
        images: [
          {
            url: "/image/map/location/location_21/review-location/entrance/entrance_1.jpg",
            caption: "Not accessible entrance example",
          },
        ],
      },
      ramp: {
        name: "Ramp",
        isLiked: null,
        votes: { like: 10, dislike: 20, notSure: 3 },
        description: "Not accessible ramp",
        images: [
          {
            url: "/image/map/location/location_21/review-location/ramp/ramp_1.jpg",
            caption: "Not accessible ramp example",
          },
        ],
      },
      pathway: {
        name: "Pathway",
        isLiked: null,
        votes: { like: 10, dislike: 20, notSure: 3 },
        description: "Not accessible pathway",
        images: [
          {
            url: "/image/map/location/location_21/review-location/pathway/pathway_1.jpg",
            caption: "Not accessible pathway example",
          },
        ],
      },
      elevator: {
        name: "Elevator",
        isLiked: null,
        votes: { like: 10, dislike: 20, notSure: 3 },
        description: "Not accessible elevator",
        images: [
          {
            url: "/image/map/location/location_21/review-location/elevator/elevator_1.jpg",
            caption: "Not accessible elevator example",
          },
        ],
      },
      restroom: {
        name: "Restroom",
        isLiked: null,
        votes: { like: 25, dislike: 5, notSure: 3 },
        description: "Accessible restroom",
        images: [
          {
            url: "/image/map/location/location_21/review-location/restroom/restroom_1.jpg",
            caption: "Accessible restroom example",
          },
        ],
      },
      seating: {
        name: "Seating",
        isLiked: null,
        votes: { like: 10, dislike: 20, notSure: 3 },
        description: "Not accessible seating",
        images: [
          {
            url: "/image/map/location/location_21/review-location/seating/seating_1.jpg",
            caption: "Not accessible seating example",
          },
        ],
      },
      staffAssistance: {
        name: "Staffassistance",
        isLiked: null,
        votes: { like: 15, dislike: 10, notSure: 5 },
        description: "staffAssistance feature detail",
        images: [
          {
            url: "/image/map/location/location_21/review-location/staffAssistance/staffAssistance_1.jpg",
            caption: "staffAssistance support",
          },
        ],
      },
      etc: {
        name: "Etc",
        isLiked: null,
        votes: { like: 15, dislike: 10, notSure: 5 },
        description: "etc feature detail",
        images: [
          {
            url: "/image/map/location/location_21/review-location/etc/etc_1.jpg",
            caption: "etc support",
          },
        ],
      },
    },
  },
];
