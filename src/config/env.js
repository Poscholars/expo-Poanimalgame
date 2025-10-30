

const devEnvironmentVariable = {
   FETCH_URL: process.env.EXPO_PUBLIC_DEV_URL,

};

const proEnvironmentVariable = {
   FETCH_URL:process.env.EXPO_PUBLIC_PRO_URL,


};

export default  __DEV__?devEnvironmentVariable:proEnvironmentVariable
