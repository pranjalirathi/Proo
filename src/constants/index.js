  import sec1 from '../assets/sec1.png'
  import sec11 from '../assets/sec11.png'
  import sec22 from '../assets/sec22.png'
  import boxex from '../assets/boxex.svg'

  import { Star }  from 'lucide-react';
  
  export const features = [
    {
      id: "feature-1",
      icon: Star,
      title: "Create by yourself",
      content:
        "What? You want to create your room, we will be letting you create your personalised members and community with being public or private.",
    },
    {
      id: "feature-2",
      icon: Star,
      title: "Connect with colleges",
      content:
        "Thought to talk to people from the top colleges, we will let you connect by code!",
    },
    {
      id: "feature-3",
      icon: Star,
      title: "Outshine Everyone",
      content:
        "Flex your coding knowledge in the rooms and just scare everyone",
    },
  ];
 
  export const roadmap = [
    {
      id: "0",
      title: "Challenges",
      text: "Compete with your colleagues in 1vs1 or tournamnet style with the most unique coding challenges ever and outshine them.",
      imageUrl: boxex,
      colorful: true,
    },
    {
      id: "1",
      title: "Your Daily Blogs",
      text: "Be the first one for getting upfdated in the world of tech and competetive programming with the help of dailyupdated blogs and resources",
      imageUrl: sec1,
    },
    {
      id: "2",
      title: "All in One Resources",
      text: "Find all of the best resources for CP like SDE sheeets from all the famous youtubers and coding platforms",
      imageUrl: sec11,
    },
    {
      id: "3",
      title: "Your personal Portfolio",
      text: "Generate your personal coidng portfolio to represent all of your stats in once for placements and interview prep.",
      imageUrl:sec22,
      colorful: true
    },
  ];
  