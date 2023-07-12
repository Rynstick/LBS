import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  
  title: "LBS wincc Unified",
  description: "A Big library",
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Rynstick/LBS' }
    ],
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/Installation' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        collapsed: false,
        items: [
          { text: 'Installation', link: '/Installation' },
          { text: 'How to use', link: '/HowToUse' }
        ]
        
      },
      {
        text: 'Functions',
        collapsed: true,
        items: [
          
              { text: 'Array Operations', link: '/ArrayOperations' },
              { text: 'Date-Time Conversion', link: '/DateTimeConversion' },
              { text: 'Database Operations', link: '/DataBaseOperations' },
              { text: 'Others', link: '/Others' }
        ]
            
          
        
        
        
      },
      
    ]
  }
})
