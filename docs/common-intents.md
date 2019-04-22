# Android Common Intents

Let's take a look at the most common implicit intents such as making a phone call, launching a web address, sending an email, etc.

## Phone Call

Permissions:

```xml
<uses-permission android:name="android.permission.CALL_PHONE" />
```

Intent:

```cs
Intent callIntent = new Intent(Intent.ActionCall);
callIntent.SetData(Android.Net.Uri.Parse("tel:0377778888"));
if (callIntent.ResolveActivity(PackageManager) != null)
{
    StartActivity(callIntent);
}
```

> **Caution** It's possible that a user won't have any apps that handle the implicit intent you send to *StartActivity()*. If that happens, the call will fail and your app will crash. To verify that an activity will receive the intent, call *ResolveActivity()* on your *Intent* object. If the result is non-null, then there is at least one app that can handle the intent and it's safe to call *StartActivity()*. If the result is null, you should not use the intent and, if possible, you should disable the feature that issue the intent.

## Send Email (to Phone Email Client)

Compose an email in the phone email client:

```cs
Intent intent = new Intent(Intent.ActionSend);
intent.SetType("plain/text");
intent.PutExtra(Intent.ExtraEmail, new String[] { "some@email.address" });
intent.PutExtra(Intent.ExtraSubject, "subject");
intent.PutExtra(Intent.ExtraText, "mail body");
if (intent.ResolveActivity(PackageManager) != null)
{
    StartActivity(Intent.CreateChooser(intent, ""));
}
```

## Send Email (to Gmail)

Gmail does not examine the extra Intent fields, so in order to use this intent, you need to use the `Intent.ACTION_SENDTO` and pass a `mailto:` URI with the subject and body URL encoded.

```cs
var uriText =
    "mailto:youremail@gmail.com" +
    "?subject=" + Android.Net.Uri.Encode("some subject text here") +
    "&body=" + Android.Net.Uri.Encode("some text here");

var uri = Android.Net.Uri.Parse(uriText);

Intent sendIntent = new Intent(Intent.ActionSendto);
sendIntent.SetData(uri);
if (sendIntent.ResolveActivity(PackageManager) != null)
{
    StartActivity(Intent.CreateChooser(sendIntent, "Send email"));
}
```

## Launch Website

Launch a website in the phone browser:

```cs
Intent browserIntent = new Intent(Intent.ActionView, Android.Net.Uri.Parse("http://www.google.com"));
if (browserIntent.ResolveActivity(PackageManager) != null)
{
    StartActivity(browserIntent);
}
```

You can also launch a Chrome tab if the app.  Take a look at [[this guide|Chrome-Custom-Tabs#setup]] for how to launch this implicit intent.

## Open Google Play Store

Open app page on Google Play:

```cs
Intent intent = new Intent(Intent.ActionView, Android.Net.Uri.Parse("market://details?id=" + PackageName));
if (intent.ResolveActivity(PackageManager) != null)
{
    StartActivity(intent);
}
```

## Compose SMS

```cs
var to = "123894994";
var message = "This is an example message";
var smsUri = Android.Net.Uri.Parse("tel:" + to);
Intent intent = new Intent(Intent.ActionView, smsUri);
intent.PutExtra("address", to);
intent.PutExtra("sms_body", message);
intent.SetType("vnd.android-dir/mms-sms");//here setType will set the previous data null.
if (intent.ResolveActivity(PackageManager) != null)
{
    StartActivity(intent);
}
```

## Google Maps
 
Show location in maps application:

```cs
Intent intent = new Intent();
intent.SetAction(Intent.ActionView);
var latitude = 18.89;
var longitude = 178.90;
var zoomLevel = 14;
String data = $"geo:{latitude},{longitude}";
if (zoomLevel != null)
{
    data = $"{data}?z={zoomLevel}";
}
intent.SetData(Android.Net.Uri.Parse(data));
if (intent.ResolveActivity(PackageManager) != null)
{
    StartActivity(intent);
}

```

## Capture Photo

To open a camera app and receive the resulting photo or video, use the `ACTION_IMAGE_CAPTURE` or `ACTION_VIDEO_CAPTURE` action. Also specify the URI location where you'd like the camera to save the photo or video, in the `EXTRA_OUTPUT` extra.
If you specify the `EXTRA_OUTPUT` then the `OnActivityResult` method will not hold the actual image in its intent, the image will written directly to the uri specified in the `EXTRA_OUTPUT`.


### Start the Camera App

```cs
const int TAKE_PHOTO_REQUEST_CODE = 100;
//Create an intent to start the camera app
var intent = new Intent(MediaStore.ActionImageCapture);
//Check if they are apps to handle taking photos
if (intent.ResolveActivity(PackageManager) != null) { 
    //Start the activity so that it will return a result
    StartActivityForResult(intent, TAKE_PHOTO_REQUEST_CODE);
}
```

### Display the picture

Once the user takes the picture, the `OnActivityResult` method will be called and we will retrieve the image from the intent and display it on the image view.

```cs
//Once we take the picture, this method will be called back
protected override void OnActivityResult(int requestCode, Result resultCode, Intent data)
{
    base.OnActivityResult(requestCode, resultCode, data);
    // We check if the user did not cancel taking the picture and if our result code is the same
    if (resultCode == Result.Ok && requestCode == TAKE_PHOTO_REQUEST_CODE) {
        //Get the picture from the intent
        var bitmap = data.GetParcelableExtra("data") as Bitmap;
        // Set and display the image in an imageView
        imageView.SetImageBitmap(bitmap);
    }
}
```

### Scaling the image

Most cameras take high resolution pictures and the images will need to be resized before being displayed or sent to a server. The `BitmapFactory` calss have several methods we can use to create a scaled down image.

```cs
public static Bitmap LoadAndResizeBitmapFromFile(this string fileName, int width, int height)
{
    // First we get the the dimensions of the file on disk
    BitmapFactory.Options options = new BitmapFactory.Options { InJustDecodeBounds = true };
    BitmapFactory.DecodeFile(fileName, options);

    // Next we calculate the ratio that we need to resize the image by
    // in order to fit the requested dimensions.
    int outHeight = options.OutHeight;
    int outWidth = options.OutWidth;
    int inSampleSize = 1;

    if (outHeight > height || outWidth > width)
    {
        inSampleSize = outWidth > outHeight
                            ? outHeight / height
                            : outWidth / width;
    }

    // Now we will load the image and have BitmapFactory resize it for us.
    options.InSampleSize = inSampleSize;
    options.InJustDecodeBounds = false;
    Bitmap resizedBitmap = BitmapFactory.DecodeFile(fileName, options);

    return resizedBitmap;
}
```


### Save the image to the file system

We can save the image take to the file system. In this example, we dont create folders, we save the image directly to the SDCard.
First start by defining properties.

```cs
Android.Net.Uri uri;
Java.IO.File imageFileName;

imageFileName = new Java.IO.File(Android.OS.Environment.ExternalStorageDirectory, $"photo-{Guid.NewGuid()}.jpg");
uri = Android.Net.Uri.FromFile(imageFileName);
```

### Wire the button to show Camera App

We can use a button to launch the camera app.

```cs
button.Click += delegate {
    //Create an intent to start the camera app
    var intent = new Intent(MediaStore.ActionImageCapture);
    intent.PutExtra(MediaStore.ExtraOutput, uri);
    //Check if they are apps to handle taking photos
    if (intent.ResolveActivity(PackageManager) != null) { 
        //Start the activity so that it will return a result
        StartActivityForResult(intent, TAKE_PHOTO_REQUEST_CODE);
    }
};
```

### Display a scaled down image

Once the picture is taken, we read it from the file system and scaled it and then display it.

```cs
//Once we take the picture, this method will be called back
protected override void OnActivityResult(int requestCode, Result resultCode, Intent data)
{
    base.OnActivityResult(requestCode, resultCode, data);
    // We check if the user did not cancel taking the picture and if our result code is the same
    if (resultCode == Result.Ok && requestCode == TAKE_PHOTO_REQUEST_CODE) {
        //Get the picture from the intent
        //var bitmap = data.GetParcelableExtra("data") as Bitmap;

        var scaledBitmap = BitmapHelpers.LoadAndResizeBitmapFromFile(uri.EncodedPath, 600, 200);
        // Set and display the image in an imageView
        imageView.SetImageBitmap(scaledBitmap);


    }
}
```

## Sharing Content

Images or binary data:

```cs
var sharingIntent = new Intent(Intent.ActionSend);
sharingIntent.SetType("image/jpg");
var uri = Android.Net.Uri.fromFile(new File(getFilesDir(), "foo.jpg"));
sharingIntent.PutExtra(Intent.ExtraStream, uri.toString());
if (sharingIntent.ResolveActivity(PackageManager) != null)
{
    StartActivity(Intent.CreateChooser(sharingIntent, "Share image using"));
}
```

or HTML:

```cs
var sharingIntent = new Intent(Intent.ActionSend);
sharingIntent.SetType("text/html");
sharingIntent.PutExtra(Intent.ExtraText, Html.FromHtml("<p>This is the text shared.</p>"));
if (sharingIntent.ResolveActivity(PackageManager) != null)
{
    StartActivity(Intent.CreateChooser(sharingIntent, "Share using"));
}
```