# Networking in Android

## Making a Networking Call

Network requests are used to retrieve or modify API data or media from a server. This is a very common task in Android development especially for dynamic data-driven clients.

### Permissions

In order to access the internet, be sure to specify the following permissions in `AndroidManifest.xml`:

```java
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.simplenetworking"
    android:versionCode="1"
    android:versionName="1.0" >
 
   <uses-permission android:name="android.permission.INTERNET" /> 
   <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

</manifest>
```

## Performing a GET Request

To make a network call, you can use the `System.Net.Http.HttpClient`. You will need to add the permissions in the `AndroidManifest.xml` file, `<uses-permission android:name="android.permission.INTERNET" />`

```cs
button.Click +=  async delegate {
    using (var client = new HttpClient()) {
        try
        {
            var content = await client.GetStringAsync("http://api.icndb.com/jokes/random");
            Console.WriteLine(content);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
    }
};
```

## Performing a POST Request

To send data to the server, you need to use the pass the parameters using `FormUrlEncodedContent`. The parameters will be sent as key/value pairs.

```cs
button.Click +=  async delegate {
    using (var client = new HttpClient())
    {
        client.BaseAddress = new Uri("http://api.peruzal.com/");
        //Create a list of params
        var content = new FormUrlEncodedContent(new[]
        {
            //The parameters to post, in a key/value pair
            new KeyValuePair<string, string>("title", "Dawn of the Planet Earth"),
            new KeyValuePair<string, string>("category", "Sci-Fi")
        });

        //Make the network call to post
        var result = await client.PostAsync("/api/movie", content);
        string resultContent = await result.Content.ReadAsStringAsync();
        Console.WriteLine(resultContent);
    }
};
```

## Checking for Network Connectivity

First, make sure to setup the android.permission.ACCESS_NETWORK_STATE permission as shown above. To verify network availability you can then define and call this method:

**Get the ConnectivityManager**

```cs
ConnectivityManager connectivityManager = (ConnectivityManager) GetSystemService(ConnectivityService);
```

To check if the device is connected to any type of network the `ActiveNetworkInfo` property of `ConnectivityManager` returns information about the type of network the device is using. The app uses this `NetworkInfo` object to see if the device is connected:

```cs
NetworkInfo networkInfo = connectivityManager.ActiveNetworkInfo;
bool isOnline = networkInfo.IsConnected;
```

### Connected to WiFi
The property `NetworkInfo.Type` returns a `ConnectivityType` value which can be checked to see if the device is connected to a WiFi network:

```cs
bool isWifi = networkInfo.Type == ConnectivityType.Wifi;
if(isWifi)
{
    Log.Debug(TAG, "Wifi connected.");
    _wifiImage.SetImageResource(Resource.Drawable.green_square);
} else
{
    Log.Debug(TAG, "Wifi disconnected.");
    _wifiImage.SetImageResource(Resource.Drawable.red_square);
}
```

### Detect When Roaming
The `.IsRoaming` property on the `NetworkInfo` class is a boolean value that is used to determine if they device is roaming while connected to a mobile network.

```cs
if (networkInfo.IsRoaming)
{
    Log.Debug(TAG, "Roaming.");
} else
{
    Log.Debug(TAG, "Not roaming.");
}
```


### Connected to mobile

```cs
/**
    * Check if there is any connectivity to a mobile network
    * @param context
    // @param type
    * @return
    */
public static bool IsConnectedMobile(Context context){
    NetworkInfo info = Connectivity.GetNetworkInfo(context);
    return (info != null && info.IsConnected && info.Type == ConnectivityType.Mobile);
}
```


### Connected to a fast network

```cs
/**
    * Check if there is fast connectivity
    * @param context
    * @return
    */
public static bool IsConnectedFast(Context context){
    NetworkInfo info = Connectivity.GetNetworkInfo(context);
    TelephonyManager tm = TelephonyManager.FromContext (context);
    return (info != null && info.IsConnected && Connectivity.IsConnectionFast(info.Type, tm.NetworkType));
}
```

## Displaying Remote Images

The Picasso and Glide libraries are by far the easiest to display remote images into an app. Add the Picasso library through Nuget.

```cs
var imageUri = "https://i.imgur.com/tGbaZCY.jpg";
ImageView ivBasicImage = (ImageView) findViewById(R.id.ivBasicImage);
Picasso.With(context).Load(imageUri).Into(ivBasicImage);
```

## Using Parse SDK

The Parse Server allows you to create mobile backend quickly without writing the API yourself. Parse creates the REST API for you and you can use REST to access it or use their SDKs.
The SDKs are available for several programming languages and platforms.

To get started with Parse, you first you need to host the server either locally, on Heroku, Amazon AWS or Azure. Then you install the Nuget package and use the this [guide]().

