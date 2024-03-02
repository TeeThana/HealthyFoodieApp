# HealthyFoodie

Graduation Project. HealthyFoodie: Health Application with Artificial Intelligence System

# Version 1.0.0

# Start app with expo (choose one)

- npx expo start
- npx expo start --tunnel
- npx expo start --tunnel --go
- npx expo start --android

# build app

- npx expo run:android

# eas config

- npm install --global eas-cli

# login with expo go account

- eas login

# build eas config

- eas build:configure

# fingerprint credentials

- eas credentials -p android

# android read thai language

in file android/app/src/main/res

- create folder "values-th" and add file "strings.xml"
  then copy this <?xml version="1.0" encoding="utf-8"?> and place at first line
