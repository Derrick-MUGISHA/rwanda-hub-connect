export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
  }
  date: string
  category: string
  tags: string[]
  image: string
  readTime: number
}

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "10 Must-Visit Destinations in Rwanda",
    excerpt: "Discover the breathtaking landscapes and wildlife that make Rwanda a top travel destination.",
    content: `
      <p>Rwanda, often called the "Land of a Thousand Hills," offers incredible experiences for travelers. From mountain gorillas to pristine lakes, here are the top destinations you shouldn't miss:</p>
      
      <h2>1. Volcanoes National Park</h2>
      <p>Home to the endangered mountain gorillas, this park offers an unforgettable wildlife experience. The gorilla trekking tours are the highlight, but the park also offers beautiful hiking trails and views of the Virunga volcanoes.</p>
      
      <h2>2. Lake Kivu</h2>
      <p>One of Africa's Great Lakes, Lake Kivu offers beautiful beaches, water activities, and stunning sunset views. The towns of Gisenyi, Kibuye, and Cyangugu along its shores are perfect for relaxation.</p>
      
      <h2>3. Nyungwe Forest National Park</h2>
      <p>This ancient rainforest is home to chimpanzees and 12 other primate species. The canopy walkway provides a unique perspective of the forest from above.</p>
      
      <h2>4. Kigali</h2>
      <p>Rwanda's clean and safe capital city offers cultural experiences, museums, and a vibrant food scene. Don't miss the Kigali Genocide Memorial and the local craft markets.</p>
      
      <h2>5. Akagera National Park</h2>
      <p>This savannah park is home to the Big Five and offers traditional safari experiences with stunning landscapes.</p>
      
      <p>Rwanda's combination of wildlife, culture, and natural beauty makes it a must-visit destination in East Africa.</p>
    `,
    author: {
      name: "Claire Uwimana",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    date: "2023-05-15",
    category: "Travel",
    tags: ["Rwanda", "Tourism", "Wildlife", "Adventure"],
    image: "https://images.unsplash.com/photo-1518784614380-e3969b7b608a",
    readTime: 8,
  },
  {
    id: "blog-2",
    title: "Rwanda's Coffee Culture: From Bean to Cup",
    excerpt: "Explore the rich tradition of coffee growing and its significance in Rwandan culture and economy.",
    content: `
      <p>Rwanda has emerged as a producer of some of the world's finest coffee beans, with a growing reputation for high-quality arabica. The country's coffee journey is as rich as its flavor profile.</p>
      
      <h2>The History of Coffee in Rwanda</h2>
      <p>Coffee was introduced to Rwanda in the early 1900s by German missionaries. After facing challenges during the country's difficult period, the coffee industry has been reborn with a focus on quality over quantity.</p>
      
      <h2>Coffee Growing Regions</h2>
      <p>The rich volcanic soil and high altitude of Rwanda's hills create ideal conditions for growing coffee. Key regions include Huye, Gakenke, Rusizi, and Lake Kivu islands, each producing beans with distinctive flavor profiles.</p>
      
      <h2>The Economic Impact</h2>
      <p>Coffee has become one of Rwanda's most valuable exports, providing income for over 400,000 small-scale farmers. Cooperatives have empowered communities and improved living standards across rural areas.</p>
      
      <h2>Where to Experience Rwandan Coffee</h2>
      <p>Visitors to Rwanda can tour coffee plantations, participate in harvesting (during season), and enjoy cupping sessions to appreciate the complex flavors. Kigali's café scene also offers excellent opportunities to taste local brews.</p>
      
      <p>Rwanda's "thousand hills" aren't just a beautiful landscape—they're the perfect environment for producing some of Africa's most distinctive coffee.</p>
    `,
    author: {
      name: "Jean-Paul Mugisha",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    date: "2023-04-22",
    category: "Culture",
    tags: ["Coffee", "Agriculture", "Economy", "Food"],
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    readTime: 6,
  },
  {
    id: "blog-3",
    title: "Sustainable Tourism Initiatives in Rwanda",
    excerpt: "How Rwanda is leading the way in eco-friendly tourism practices across Africa.",
    content: `
      <p>Rwanda has positioned itself as a leader in sustainable tourism, implementing innovative practices that protect its natural resources while providing memorable experiences for visitors.</p>
      
      <h2>Conservation Success Stories</h2>
      <p>The mountain gorilla conservation program is one of Africa's greatest wildlife success stories. Through careful management and community involvement, gorilla populations have increased from the brink of extinction.</p>
      
      <h2>Plastic Ban Impact</h2>
      <p>Rwanda implemented one of the world's strictest plastic bag bans in 2008. This policy has kept the country remarkably clean and has inspired similar initiatives across Africa and beyond.</p>
      
      <h2>Community-Based Tourism</h2>
      <p>Local communities now directly benefit from tourism through revenue-sharing programs, employment opportunities, and cultural exchange initiatives. This approach ensures tourism benefits extend beyond urban centers.</p>
      
      <h2>Luxury Eco-Lodges</h2>
      <p>Rwanda has attracted responsible luxury tourism investments, with properties like Bisate Lodge, Singita Kwitonda, and Magashi Camp setting new standards for sustainable high-end accommodations.</p>
      
      <p>As global travelers increasingly seek meaningful, sustainable experiences, Rwanda's forward-thinking approach to tourism development serves as a model for countries worldwide.</p>
    `,
    author: {
      name: "Diane Mukasine",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    date: "2023-06-03",
    category: "Environment",
    tags: ["Sustainability", "Conservation", "Eco-Tourism", "Development"],
    image: "https://images.unsplash.com/photo-1582559134824-9e33b2ff7294",
    readTime: 7,
  },
]

export const getBlogById = (id: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.id === id)
}

export const getBlogs = (): BlogPost[] => {
  return blogPosts
}

