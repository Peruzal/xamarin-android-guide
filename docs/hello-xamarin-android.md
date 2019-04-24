# Creating your first Xamarin.Android App

You can use either Visual Studio for Windows or for Mac for creating a new Xamarin.Android app.


## Create new project

![Create New Project][1]

1. Open Visual Studio
2. Choose **File** -> **New Solution**
3. Choose **Android** -> **Android app**


## Configure the project

![Configure the App][2]

1. **App Name** - This is the name of the app.
2. **Organization identifier** - This is the unique name used together with the app name to uniquely identify your app on the Google Play Store.
3. **Target platforms** - This is the platforms on which the app can run, its always advisable to choose the version of the Android that can support at least 90% of the devices in the wild. 
4. **Theme** - The default theme that will be applied to the entire app. This can be changed and configured later.

!!! info "Organization Identifier"
    The convention is to use the reverse of the domain name since its guaranteed to be unique.

!!! note "Android Versions"
    Google maintains a list with statistics on the different versions of Android currently installed on [Google Android Dashboard][3]


## Project Structure



[1]: images/create-new-project.png
[2]: images/configure-app.png
[3]: https://www.google.com/android/dashboard