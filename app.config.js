export default {
    expo: {
      name: "AppBaqPark",
      slug: "AppBaqPark",
      scheme: "com.appbaqpark",
      userInterfaceStyle: "automatic",
      orientation: "default",
      web: {
      "output": "static",
      "bundler": "metro"
        },
    plugins: [
      [
        "expo-router",
        {
          "origin": "https://n"
        }
      ]
    ],
      android: {
        package: "com.appbaqpark",
        config: {
          googleMaps: {
            apiKey: process.env.GOOGLE_MAPS_API_KEY,
          },
        },
      },
      extra: {
        GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
        PARKS_KEY: process.env.PARKS_KEY,
        SUPABASE_URL: process.env.SUPABASE_URL,
        SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
        eas: {
          projectId: "bd34d188-c154-409b-8314-797e6d2ee458",
          secrets: {
            GOOGLE_MAPS_API_KEY: true,
            PARKS_KEY: true,
            SUPABASE_URL: true,
            SUPABASE_ANON_KEY: true,
          },
        },
      },
    },
  };
