export type AuthStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type AppTabParamList = {
  Home: undefined;
  Favorites: undefined;
  Profile: undefined;
};

export type AppStackParamList = {
  Tabs: undefined;
  Product: { productId?: string } | undefined;
  CreateListing: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};
