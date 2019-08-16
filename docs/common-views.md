# Android Common Views

This chapter describes the common UI views used to compose your Xamarin.Android app. The views in Xamarin.Android are wrappers of the natives Android views. 

## Button

There are three standard types of buttons:

- `Floating action button`: A circular material button that lifts and displays an ink reaction on press.
- `Raised button`: A typically rectangular material button that lifts and displays ink reactions on press.
- `Flat button`: A button made of ink that displays ink reactions on press but does not lift.

![Button Types](/images/buttons.png)

To create a button with text, use the following XML :

```xml
<Button
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="LOGIN" />
```

If we want the button's width to be the same as its parent, we would change the `android:layout_height` to `match_parent`.

```xml
<Button
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="LOGIN" />
```

### Drawables on buttons

A normal button can also have an image on the left or right, by using the `android:drawableLeft` and `android:drawableRight` attributes. Thses drawables have 
limited use as the images inside them can not be resized.

```xml
<Button
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="@string/button_text"
    android:drawableLeft="@drawable/button_icon"/>
```

## Floating Action Button
The floating action action button is available as a support package. You need to the Android Support Design v7 package from from `Nuget` before you can use it in the project.

```xml
<android.support.design.widget.FloatingActionButton
    android:id="@+id/fab"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_gravity="bottom|end"
    android:layout_margin="16dp"
    app:srcCompat="@android:drawable/ic_input_add" />
```

The floating action button is mostly used inside the `CoordinatorLayout` or `FrameLayout`. This layout is also included as part of the Android Support Design Package.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true">


    <android.support.design.widget.FloatingActionButton
        android:id="@+id/fab"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="bottom|end"
        android:layout_margin="@dimen/fab_margin"
        app:srcCompat="@android:drawable/ic_input_add" />

</android.support.design.widget.CoordinatorLayout>
```

### FAB Properties

Property | Description |
------- | ------- |
Position | You can position the floating button by using `layout_gravity` attribute.
Size | FAB supports two sizes `normal` and `mini`. You can define the size of the button by using `app:fabSize` attribute
Background Color | By default, fab takes `colorAccent` as background color. If you want to change the background of fab, use `app:backgroundTint` attribute to define your own background color
Ripple Color| Sets the color of the ripple effect of your FloatingActionButton. Can be a color resource or hex string. `app:rippleColor`
Compat Padding | Enable compat padding. Maybe a boolean value, such as true or false. `app:useCompatPadding`
Elevation | Can be a string, integer, boolean, color value, floating point, dimension value. `app:elevation`



## Borderless Button
A style is used to get the a borderless button. Note that the style does not use the `android` prefix.

```xml
<Button
    style="@style/Widget.AppCompat.Button.Borderless"
    android:text="Borderless Button"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

You can also get a coloured borderless button. The default color used is the `accent` color from the theme.
```xml
<Button
    style="@style/Widget.AppCompat.Button.Borderless.Colored"
    android:text="Borderless Button"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

## EditText

Text fields allow users to input text, select text, and lookup data via auto-completion. Text fields usually appear in forms. Users may enter text, numbers, or mixed-format types of input.
Touching a text field makes the two actions occur:

- Places the cursor there
- Displays the keyboard

![Textfiled](/images/textfield.png)

### Retrieving the Value

Getting the value of the text entered into an EditText is as follows:

```cs
EditText etUsername = FindViewById<EditText>(Resource.Id.etUsername);
var username = etUsername.Text;
```


### Text field anatomy

- 1. Labels describe the type of input requested in each field
- 2. Hint text is placeholder text that suggests the type of information requested, sometimes in the form of an example
- 3. Helper text appears below input fields to provide additional context

```xml
<EditText
   android:id="@+id/album_description_view"
   android:layout_width="match_parent"
   android:layout_height="wrap_content"
   android:hint="@string/album_description"
   android:inputType="textMultiLine" />
```

### Displaying Floating Label Feedback

Traditionally, the `EditText` hides the `hint` message (explained above) after the user starts typing. In addition, any validation error messages had to be managed manually by the developer. 

<img src="https://i.imgur.com/UM7NmiK.gif" alt="floating" width="400" />

Starting with Android M and the  [Design Support Library]({{< ref "design-support-library/index.md" >}}), the `TextInputLayout` can be used to setup a floating label to display hints and error messages. First, wrap the `EditText` in a `TextInputLayout`:


```xml
<android.support.design.widget.TextInputLayout
    android:id="@+id/input_layout_name"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <EditText
        android:id="@+id/input_name"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:singleLine="true"
        android:hint="@string/hint_name" />
</android.support.design.widget.TextInputLayout>
```

Now the hint will automatically begin to float once the `EditText` takes focus as shown below:

<img src="https://i.imgur.com/S456c0X.gif" alt="floating" width="400" /> 

We can also use the `TextInputLayout` to display error messages using the `SetError` and `SetErrorEnabled` properties in the activity at runtime.

### Adding Character Counting

`TextInputLayout` since the [announcement of support design library v23.1](http://android-developers.blogspot.com/2015/10/android-support-library-231.html?linkId=17977963) also can expose a character counter for an `EditText` defined within it.  The counter will be rendered below the `EditText` and can change colors of both the line and character counter if the maximum number of characters has been exceeded:

<img src="http://imgur.com/eEYwIO3.png"/>

The `TextInputLayout` simply needs to define `app:counterEnabled` and `app:CounterMaxLength` in the XML attributes.  These settings can also be defined dynamically through `setCounterEnabled()` and `setCounterMaxLength()`:

```xml
<android.support.design.widget.TextInputLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    app:counterEnabled="true"
    app:counterMaxLength="10"
    app:counterTextAppearance="@style/counterText"
    app:counterOverflowTextAppearance="@style/counterOverride">
    <EditText
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"
       android:hint="Username"
       android:layout_centerHorizontal="true"
       android:layout_centerVertical="true"
       android:ems="10"
       android:hint="Username" />
</android.support.design.widget.TextInputLayout>
```

### Adding Password Visibility Toggles

**NOTE**: You must have support library 24.2.0 or higher to use this feature.  

<img src="http://imgur.com/33oQgLr.png"/>

If you use an `EditText` with an input password type, you can also enable an icon that can show or hide the entire text using the `passwordToggleEnabled` attribute.    You can also change the default eye icon with  `passwordToggleDrawable` attribute or the color hint using the `passwordToggleTint` attribute.  See the `TextInputLayout` [attributes](https://developer.android.com/reference/android/support/design/widget/TextInputLayout.html#attr_android.support.design:passwordToggleTintMode) for more details.

```xml
<android.support.design.widget.TextInputLayout
        android:id="@+id/username_text_input_layout"
        app:passwordToggleEnabled="true"
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <EditText
            android:id="@+id/etUsername"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_centerHorizontal="true"
            android:layout_centerVertical="true"
            android:ems="10"
            android:inputType="textPassword"
            android:hint="Username" />

    </android.support.design.widget.TextInputLayout>
```

### Providing Auto-complete

Check out the [official text fields](http://developer.android.com/guide/topics/ui/controls/text.html#AutoComplete) guide for a step-by-step on how to setup autocomplete for the entry.


### EditText Input Types
We can customize the soft keyboard based on the required input for the EditText. These can be changed with the `android:inputType` attribute. Here are the available input types

Type | Description
-----|------------
textUri | Text that will be used as a URI
textEmailAddress | Text that will be used as an e-mail address
textPersonName | Text that is the name of a person
textPassword | Text that is a password that should be obscured
number | A numeric only field
phone | For entering a phone number
date | For entering a date
time | For entering a time
textMultiLine | Allow multiple lines of text in the field

You can set multiple inputType attributes if needed (separated by '|')

```xml
<EditText
  android:inputType="textCapSentences|textMultiline"
/>
```

More input types are available from the [here](https://developer.android.com/reference/android/widget/TextView.html#attr_android:inputType)

### Further Entry Customization

We might want to limit the entry to a single-line of text (avoid newlines):

```xml
<EditText
  android:singleLine="true"
  android:lines="1"
/>
```

You can limit the characters that can be entered into a field using the digits attribute:

```xml
<EditText
  android:inputType="number"
  android:digits="01"
/>
```

This would restrict the digits entered to just "0" and "1". We might want to limit the total number of characters with:

```xml
<EditText
  android:maxLength="5"
/>
```

### Displaying Placeholder Hints

You may want to set the hint for the EditText control to prompt a user for specific input with:

```xml
<EditText
    ...
    android:hint="@string/my_hint">
</EditText>
```

### Changing the bottom line color

<img src="http://imgur.com/XUWKoju.png"/>

Assuming you are using the AppCompat library, you can override the styles `colorControlNormal`, `colorControlActivated`, and `colorControlHighlight`:

```xml
<style name="Theme.App.Base" parent="Theme.AppCompat.Light.DarkActionBar">
    <item name="colorControlNormal">#d32f2f</item>
    <item name="colorControlActivated">#ff5722</item>
    <item name="colorControlHighlight">#f44336</item>
</style>
```

## ImageView

Displays an image.This view takes care of the loading and optimizing of the image, freeing you to focus on app-specific details like the layout and content.
Use the `scaleType` to control how the image resizes. Images are not clickable by default. You will need to enable `android:clickable=true`.


Note the [scaleType attribute](http://developer.android.com/reference/android/widget/ImageView.ScaleType.html) which defines how the images will be scaled to fit in your layout. In the example, using scaleType "center", the image will be displayed at its native resolution and centered in the view, regardless of how much space the view consumes.
```xml
<ImageView
    android:id="@+id/photo_image_view"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:scaleType="center"
    android:src="@drawable/beach" />
```

### Sizing ImageView Controls

By default, contents of an ImageView control are of a certain size -- usually the size of the image dimensions. They can also be bounded by their layout_width and layout_height attributes:  

```xml
<ImageView
    android:layout_width="50dp"
    android:layout_height="50dp"
    android:scaleType="fitXY"
    ...
/>
```

The `scaleType` above has been set to `fitXY` which sets the height and the width up or down to fit the maximum dimensions specified. 

Fixing the width and height however means that the proportions of the width and height of the original image, known as the aspect ratio, will be altered.  We can take advantage of the [adjustViewBounds](http://developer.android.com/reference/android/widget/ImageView.html#attr_android:adjustViewBounds) parameter to preserve this aspect ratio.  However, we must either allow the height and/or width to be adjustable (i.e. by using `maxWidth` and using `wrap_content` for the dimension).  Otherwise, the dimensions cannot be readjusted to meet the required aspect ratio.

```xml
<ImageView
    android:layout_width="50dp"
    android:layout_height="wrap_content"
    android:scaleType="fitXY"
    android:adjustViewBounds="true"
    ...
/>
```

### Scale Types

An ImageView can display an image differently based on the `scaleType` provided. Above we discussed the `fitXY` type along with `adjustViewBounds` to match the aspect ratio of the drawable. The following is a list of all the most common types:

| Scale Type | Description |
| ---------- | ----------- |
| center     | Displays the image centered in the view with no scaling. |
| centerCrop | Scales the image such that both the x and y dimensions are greater than or equal to the view, while maintaining the image aspect ratio; centers the image in the view. |
| centerInside | Scales the image to fit inside the view, while maintaining the image aspect ratio. If the image is already smaller than the view, then this is the same as center. |
| fitCenter | Scales the image to fit inside the view, while maintaining the image aspect ratio. At least one axis will exactly match the view, and the result is centered inside the view. |
| fitStart | Same as fitCenter but aligned to the top left of the view. |
| fitEnd   | Same as fitCenter but aligned to the bottom right of the view. |
| fitXY | Scales the x and y dimensions to exactly match the view size; does not maintain the image aspect ratio. |
| matrix | Scales the image using a supplied Matrix class. The matrix can be supplied using the setImageMatrix method. A Matrix class can be used to apply transformations such as rotations to an image. |

**Note:** The `fitXY` scale type allows you to set the exact size of the image in your layout. However, be mindful of potential distortions of the image due to scaling. If you’re creating a photo-viewing application, you will probably want to use the `center` or `fitCenter` scale types.

<img src="https://images.thoughtbot.com/blog-vellum-image-uploads/wDbiaqGSQyyErtXGSh6w_scaletype.png" width="600"/>

Refer to this [ImageView ScaleType visual guide](https://robots.thoughtbot.com/android-imageview-scaletype-a-visual-guide) for additional reference. **Remember** that if you wish to match the aspect ratio of the actual drawable, `adjustViewBounds=true` must be declared along with not defining an explicit width and/or height.


### Supporting Multiple Densities

Since Android has so many different screen sizes, resolutions and densities, there is a [[powerful system for selecting the correct image asset|Understanding-App-Resources#introducing-alternate-resources]] for the correct device. There are specific drawable folders for each device density category including: ldpi (low), mdpi (medium), hdpi (high), and xhdpi (extra high). Notice that every app has folders for image drawables such as `drawable-mdpi` which is for "medium dots per inch". 

To create alternative bitmap drawables for different densities, you should follow the 3:4:6:8 scaling ratio between the four generalized densities. Refer to the chart below:


Density | DPI | Example Device | Scale | Pixels
--------|-----|----------------|-------|-------
ldpi | 120 | Galaxy Y | 0.75x | 1dp = 0.75px
mdpi | 160 | Galaxy Tab | 1.0x | 1dp = 1px
hdpi | 240 | Galaxy S II | 1.5x | 1dp = 1.5px
xhdpi | 320 | Nexus 4 | 2.0x | 1dp = 2px
xxhdpi | 480 | Nexus 5 | 3.0x | 1dp = 3px
xxxhdpi | 640 | Nexus 6 | 4.0x | 1dp = 4px

This means that if you generate a 100x100 for mdpi (1x baseline), then you should generate the same resource in 150x150 for hdpi (1.5x), 200x200 image for xhdpi devices (2.0x), 300x300 image for xxhdpi (3.0x) and a 75x75 image for ldpi devices (0.75x). See [these density guidelines](http://iconhandbook.co.uk/reference/chart/android/) for additional details. 

![Densities](http://developer.android.com/images/screens_support/screens-densities.png)

### Mipmaps and Drawables

Starting with Android 4.3, there is now an option to use the `res/mipmap` folder to store "mipmap" images. Mipmaps are most **commonly used for application icons** such as the launcher icon. To learn more about the benefits of mipmaps be sure to check out the [mipmapping for drawables post](https://programmium.wordpress.com/2014/03/20/mipmapping-for-drawables-in-android-4-3/). 

Mipmap image resources can then be accessed using the `@mipmap/ic_launcher` notation in place of `@drawable`. Placing icons in mipmap folders (rather than drawable) is considered a best practice because they can often be used at resolutions different from the device’s current density. For example, an `xxxhdpi` app icon might be used on the launcher for an `xxhdpi` device. Review this [post about preparing for the Nexus 6](http://android-developers.blogspot.com/2014/10/getting-your-apps-ready-for-nexus-6-and.html) which explains in more detail.


### Working with Bitmaps

We can change the bitmap displayed in an ImageView to a drawable resource with:

```cs
var imageView = FindViewById<ImageView>(Resource.Id.imageView);
imageView.SetImageResource(Resource.Mipmap.Icon);
```

or to any arbitrary bitmap with:

```cs
Bitmap bMap = BitmapFactory.DecodeFile("/sdcard/test2.png");
imageView.SetImageBitmap(bMap);
```


### Setting an Image Resource from a string
Sometimes you have want to set an image drawable using its string filename but the problem is Android uses integer ids for the image names.

```cs
var imageView = FindViewById<ImageView>(Resource.Id.imageView);
//imageView.SetImageResource(Resource.Mipmap.Icon);

var imageId = Resources.GetIdentifier("icon", "drawable", PackageName);
imageView.SetImageResource(imageId);
```


### Scaling a Bitmap

If we need to resize a Bitmap, we can call the [createScaledBitmap](https://developer.xamarin.com/recipes/android/resources/general/load_large_bitmaps_efficiently/)
```cs
// Load a bitmap from the drawable folder
var bitmap = BitmapFactory.DecodeResource(Resources, Resource.Drawable.Icon);
// Resize the bitmap to 50x50 (width x height)
var scaledBitmap = Bitmap.CreateScaledBitmap(bitmap, 50, 50, false);
// Loads the resized Bitmap into an ImageView
imageView.SetImageBitmap(scaledBitmap);
```

### Loading Images from the network
Loading images from the network is a challening task and the best way is to use libraries. The most popular libraries are :

* [Picasso](https://components.xamarin.com/view/square.picasso)
* [Glide](https://components.xamarin.com/gettingstarted/glidecomponent)

Install the libraries from Nuget and follow the getting started guide to start using them.

## ImageButton

A button that displays an image and its clickable.

```xml
<ImageButton
    android:id="@+id/photo_image_view"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:scaleType="centerCrop"
    android:src="@drawable/beach" />
```

## RadioButton

Radio buttons allow the user to select one option from a set. You should use radio buttons for optional sets that are mutually exclusive if you think that the user needs to see all available options side-by-side. If it's not necessary to show all options side-by-side, use a spinner instead.

![Radio Buttons](/images/radio-buttons.png)


To create each radio button option, create a RadioButton in your layout. However, because radio buttons are mutually exclusive, you must group them together inside a RadioGroup. By grouping them together, the system ensures that only one radio button can be selected at a time.


```xml
<RadioGroup
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:orientation="vertical">
    <RadioButton
        android:id="@+id/yes_radio_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Yes"
        android:checked="true" />
    <RadioButton
        android:id="@+id/no_radio_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="No"
        android:textAppearance="?android:textAppearanceMedium" />
    <RadioButton
        android:id="@+id/maybe_radio_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Maybe"
        android:textAppearance="?android:textAppearanceSmall" />
</RadioGroup>
```


### Attaching Click Event
The radio button have a `Click` event. We can attach the event to the buttons in code as follows : 

```cs
//Find the radio buttons in the layout file
var radioAttendingYes = FindViewById<RadioButton>(Resource.Id.rbn_attending_yes);
var radioAttendingNo = FindViewById<RadioButton>(Resource.Id.rbn_attending_no);
var radioAttendingMaybe = FindViewById<RadioButton>(Resource.Id.rbn_attending_maybe);

//Attach click event to the radio buttons
radioAttendingYes.Click += RadioButtonClick;
radioAttendingNo.Click += RadioButtonClick;
radioAttendingMaybe.Click += RadioButtonClick;
```

And then use a private method to handle the clicking of the radio buttons : 

```cs
//Define a private method to handle clicking of the Radio Button
private void RadioButtonClick(object sender, EventArgs e) {
    var radioButton = (RadioButton)sender;
    Console.WriteLine(radioButton.Text);
}
```

### Changing the State
We can change the state of the radio button by using the `Toggle` method, or setting the `Checked` property.

## View

A plain rectangle that can be used as a divider.

```xml
<View
    android:layout_width="match_parent"
    android:layout_height="1dp"
    android:background="#CCC" />
```

## Spinner

Spinners provide a quick way to select one value from a set. In the default state, a spinner shows its currently selected value. Touching the spinner displays a dropdown menu with all other available values, from which the user can select a new one.

![Spinner](/images/spinner.png)

```xml
<Spinner
    android:id="@+id/sort_by_spinner"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />
```

### Populate Spinner with choices with XML
You can populate the Spinner using a `string-array` resource. Create a file the `Resources\Values` folder and call it `array.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string-array name="cities">
        <item>Home</item>
        <item>Work</item>
        <item>Other</item>
        <item>Custom</item>
    </string-array>
</resources>
```


Now you can populate the entries for the spinner using the data from the xml file.

```xml
<Spinner
    android:entries="@array/cities"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"/>
```

### Spinner Mode
The spinner by default displays a dropdown, but it can be changed to show a dialog using the `android:spinnerMode="dialog"`.


### Populate Spinner with code

To populate the spinner in code, you will need to create a custom array adapter, then bind the array adapter to the spinner.


```cs
var choices = new string[] { "Beach", "BBQ", "Family Dinner", "Party"};
var spinner = FindViewById<Spinner>(Resource.Id.sort_by_spinner);
var adapter = new ArrayAdapter<string>(this,Android.Resource.Layout.SimpleSpinnerDropDownItem, choices);
adapter.SetDropDownViewResource(Android.Resource.Layout.SimpleSpinnerDropDownItem);
spinner.Adapter = adapter;

spinner.ItemSelected += (sender, e) => { 
    Console.WriteLine(spinner.GetItemAtPosition(e.Position));
};
```

or create it using an existing xml file with a string array 

```cs
//Find the spinner from the layout
var spinner = FindViewById<Spinner>(Resource.Id.spinner);
//Create an ArrayAdapter with the xml resource file and dropdown layout
var arrayAdapter = ArrayAdapter.CreateFromResource(this, Resource.Array.places, Android.Resource.Layout.SimpleSpinnerDropDownItem);
//Bind the adapter to the spinner
spinner.Adapter = arrayAdapter;
```

### Responding to Events
The spinner have an `ItemSelected` event. Use this to find out which of the options have been selected.

```cs
//Find the spinner 
var spinner = FindViewById<Spinner>(Resource.Id.sort_by_spinner);
//Attach the ItemSelected event
spinner.ItemSelected += (sender, e) => { 
    Console.WriteLine(spinner.GetItemAtPosition(e.Position));
};
```

## CheckBox

Checkboxes allow the user to select one or more options from a set. Typically, you should present each checkbox option in a vertical list.

```xml
<CheckBox
    android:id="@+id/notify_me_checkbox"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="@string/notify_me"
    android:textAppearance="?android:textAppearanceMedium" />
```

### Responding to Events

The checkbox have a `Click` event that fires when the the checkbox state changes.

```cs
//Find the checkbox in the layout 
CheckBox checkbox = FindViewById<CheckBox>(Resource.Id.checkbox);

//Attach the click event
checkbox.Click += (o, e) => {
    if (checkbox.Checked)
        Toast.MakeText (this, "Selected", ToastLength.Short).Show ();
    else
        Toast.MakeText (this, "Not selected", ToastLength.Short).Show ();
};
```

The state of the checkbox can also be changed using the `Toggle` method and the `Checked` property.

## Switch

On/off switch that can you drag to the right or left or just tap to toggle.  `SwitchCompat` is a version of the Switch widget which runs on devices back to API 7

```xml
<Switch
    android:id="@+id/backup_photos_switch"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="@string/auto_backup_photos"
    android:textAppearance="?android:textAppearanceSmall" />
```

For backwards compatibility use `SwitchCompat`. On older devices, the control is called a `Togglebutton`.

```xml
<android.support.v7.widget.SwitchCompat
    android:checked="true"
    android:id="@+id/backup_photos_switch"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Backup photos automatically to the cloud when on wifi"
    android:textAppearance="?android:textAppearanceSmall" />
```


### Responding to events

```cs
var backupPhotosSwitch = FindViewById<Switch>(Resource.Id.backup_photos_switch);
backupPhotosSwitch.CheckedChange +=  (object sender, CompoundButton.CheckedChangeEventArgs e) => { 
    Console.WriteLine($"Switch is {e.IsChecked}");
};
```


## SeekBar

Displays progress and allows you to drag the handle anywhere in the bar e.g for music or video.

```xml
<SeekBar
    android:id="@+id/seek_bar"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:max="100"
    android:progress="20" />
```

### SeekBar Events

You handle the Progress event to get notified when the progress of the SeekBar changes.

```cs
var seekBar = FindViewById<SeekBar>(Resource.Id.seek_bar);
seekBar.ProgressChanged += (object sender, SeekBar.ProgressChangedEventArgs e) => { 
    Console.WriteLine($"Progress is now {e.Progress}");
};
```

## RatingBar

```xml
<RatingBar
    android:id="@+id/rating_bar"
    style="?android:attr/ratingBarStyleSmall"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:numStars="5"
    android:rating="2.5"
    android:stepSize="0.5" />
```

### RatingBar Events

You can use the RatingBarChange event to subscribe to changes in the RatingBar

```cs
var ratingBar = FindViewById<RatingBar>(Resource.Id.rating_bar);
ratingBar.RatingBarChange += (object sender, RatingBar.RatingBarChangeEventArgs e) => { 
    Console.WriteLine($"Rating is {e.Rating}");
};
```

## ProgressBar

Loading spinner, used to show that something is running.

```xml
<ProgressBar
    android:id="@+id/loading_spinner"
    style="?android:progressBarStyle"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content" />
```

Can also change the style to use a horizontal progressbar, use the style style="?android:progressBarStyleHorizontal"

```xml
<ProgressBar
    android:id="@+id/progress_bar"
    style="?android:progressBarStyleHorizontal"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:indeterminate="false"
    android:max="100"
    android:progress="40"/>
```

## SearchView

A search view that you type a query into.

```xml
    <SearchView
        android:id="@+id/search_viewer"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:iconifiedByDefault="true"
        android:queryHint="Search photos" />
```        


## TextView

Displays text to the user and optionally allows them to edit it. A TextView is a complete text editor, however the basic class is configured to not allow editing; see `EditText` for a subclass that configures the text view for editing.

### Typeface

As stated in the overview, there are three different default typefaces which are known as the Droid family of fonts: `sans`, `monospace` and `serif`. You can specify any one of them as the value for the `android:typeface` attribute in the XML:

```xml
<TextView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="This is a 'sans' demo!"
    android:typeface="sans"
/>
```

Here's how they look:

<img alt="fonts" src="http://i.imgur.com/BES7g98.png" width="400" />

In addition to the above, there is another attribute value named "normal" which defaults to the sans typeface.

### Text Style

The `android:textStyle` attribute can be used to put emphasis on the text. The possible values are: `normal`, `bold`, `italic`. You can also specify `bold|italic`.

```xml
<TextView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="This is bold!"
    android:textStyle="bold"
/>
```

A sampling of styles can be seen below:

<img alt="style" src="http://i.imgur.com/BcX2r9O.png" width="400" />

### Text Size

`android:textSize` specifies the font size. Its value must consist of two parts: a floating-point number followed by a unit. It is generally a good practice to use the `sp` unit so the size can scale depending on user settings.

```xml
<TextView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="14sp is the 'normal' size."
    android:textSize="14sp"
/>
```

A sampling of styles can be seen below:

<img alt="style" src="http://i.imgur.com/4pimMzN.png" width="400" />

Too many type sizes and styles at once can wreck any layout. The basic set of styles are based on a typographic scale of 12, 14, 16, 20, and 34. Refer to this [typography styles guide](https://www.google.com/design/spec/style/typography.html#typography-styles) for more details.

### Text Truncation

There are a few ways to truncate text within a `TextView`. First, to restrict the total number of lines of text we can use `android:maxLines` and `android:minLines`:

```xml
<TextView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:minLines="1"
    android:maxLines="2"
/>
```

In addition, we can use `android:ellipsize` to begin truncating text 

```xml
<TextView
    ...
    android:ellipsize="end"
    android:singleLine="true"
/>
```

Following values are available for `ellipsize`: `start` for `...bccc`, `end` for `aaab...`, `middle` for `aa...cc`, and `marquee` for `aaabbbccc` sliding from left to right. Example:

### Text Color

The `android:textColor` and `android:textColorLink` attribute values are hexadecimal RGB values with an optional alpha channel, similar to what's found in CSS:

```xml
<TextView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="A light blue color."
    android:textColor="#00ccff"
    android:textColorLink="#8DE67F"
/>
```

The `android:textColorLink` attribute controls the highlighting for [[hyperlinks embedded within the TextView|Working-with-the-TextView#inserting-html-formatting]]. This results in:

![](http://i.imgur.com/UlLSrEG.png)

### Text Shadow

You can use three different attributes to customize the appearance of your text shadow:

 * `android:shadowColor` - Shadow color in the same format as textColor.
 * `android:shadowRadius` - Radius of the shadow specified as a floating point number.
 * `android:shadowDx` - The shadow's horizontal offset specified as a floating point number.
 * `android:shadowDy` - The shadow's vertical offset specified as a floating point number.

The floating point numbers don't have a specific unit - they are merely arbitrary factors.

```xml
<TextView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="A light blue shadow."
    android:shadowColor="#00ccff"
    android:shadowRadius="2"
    android:shadowDx="1"
    android:shadowDy="1"
/>
```

This results in:

![](http://i.imgur.com/blFEHxX.png)

### Various Text Properties

There are many other text properties including `android:lineSpacingMultiplier`, `android:letterSpacing`, `android:textAllCaps`, `android:includeFontPadding` and [many others](http://developer.android.com/reference/android/widget/TextView.html#nestedclasses):

```xml
<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:lineSpacingMultiplier="1.1"
    android:textAllCaps="true"
/>
```

`android:includeFontPadding` removes the extra padding around large fonts. `android:lineSpacingMultiplier` governs the spacing between lines with a default of "1".

## Inserting HTML Formatting

TextView natively supports [HTML](http://developer.android.com/reference/android/text/Html.html) by translating HTML tags to [spannable](http://developer.android.com/reference/android/text/Spannable.html) sections within the view. To apply basic HTML formatting to text, add text to the TextView with:

```cs
TextView view = (TextView)FindViewById(Resource.Id.sampleText);
//Htmlformatted text
String formattedText = "This <i>is</i> a <b>test</b> of <a href='http://foo.com'>html</a>";
//Check which build we running on and use the appropriate method
if (Build.VERSION.SdkInt >= BuildVersionCodes.N)
{
    view.Text = (Html.FromHtml(formattedText, FromHtmlOptions.ModeLegacy));
}
else { 
    view.Text = (Html.FromHtml(formattedText));
}
```

This results in:

![](http://i.imgur.com/PEl2EKl.png)

Note that all tags are not supported. See [this article](http://javatechig.com/android/display-html-in-android-textview) for a more detailed look at supported tags and usages


### Setting Font Colors

For setting font colors, we can use the `<font>` tag as shown:

```cs
Html.FromHtml("Nice! <font color='#c5c5c5'>This text has a color</font>. This doesn't"); 
```

And you should be all set. 

### Storing Long HTML Strings

If you want to store your HTML text within `res/values/strings.xml`, you have to use CDATA to escape such as:

```xml
<?xml version="1.0" encoding="utf-8"?>
<string name="htmlFormattedText">
    <![CDATA[
        Please <a href="http://highlight.com">let us know</a> if you have <b>feedback on this</b> or if 
        you would like to log in with <i>another identity service</i>. Thanks!   
    ]]>
</string>
```

and access the content with `getString(R.string.htmlFormattedText)` to load this within the TextView. 

For more advanced cases, you can also check out the [html-textview](https://github.com/dschuermann/html-textview) library which adds support for almost any HTML tag within this third-party TextView.

## Autolinking URLs

TextView has [native support](http://developer.android.com/reference/android/widget/TextView.html#attr_android:autoLink) for automatically locating URLs within the their text content and making them clickable links which can be opened in the browser. To do this, enable the `android:autolink` property:

```xml
<TextView
     android:id="@+id/custom_font"
     android:layout_width="match_parent"
     android:layout_height="wrap_content"
     android:autoLink="all"
     android:linksClickable="true"
/>
```

This results in:

![](http://i.imgur.com/73bwaRm.png)

## Displaying Images within a TextView

A TextView is actually surprisingly powerful and actually supports having images displayed as a part of it's content area. Any images stored in the "drawable" folders can actually be embedded within a TextView at several key locations in relation to the text using the [android:drawableRight](http://developer.android.com/reference/android/widget/TextView.html#attr_android:drawableRight) and the `android:drawablePadding` property. For example:

```xml
<TextView xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"     
    android:gravity="center"
    android:text="@string/my_contacts"
    android:drawableRight="@drawable/ic_action_add_group"
    android:drawablePadding="8dp"
/>
```

Which results in:

![Contacts View](https://i.imgur.com/LoN8jpH.png)

In Android, many views inherit from `TextView` such as `Button`s, `EditText`s, `RadioButton`s which means that all of these views support the same functionality. For example, we can also do:

```xml
<EditText
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:hint="@string/user_name"
    android:drawableLeft="@drawable/ic_action_person"
    android:drawablePadding="8dp"
/>
```

Which results in:

![EditText with drawable](https://i.imgur.com/GZiIf1C.png)

The relevant attributes here are `drawableLeft`, `drawableRight`, `drawableTop` and `drawableBottom` along with `drawablePadding`. Check out [this TextView article](http://antonioleiva.com/textview_power_drawables/) for a more detailed look at how to use this functionality. 

Note that if you want to be able to better control the size or scale of the drawables, check out [this handy TextView extension](http://stackoverflow.com/a/31916731/313399) or [this bitmap drawable approach](http://stackoverflow.com/a/29804171/313399). You can also make calls to [setCompoundDrawablesWithIntrinsicBounds](https://groups.google.com/forum/#!topic/android-developers/_Gzbe0KCP_0) on the `TextView`.

## Using Custom Fonts

We can actually use any custom font that we'd like within our applications. Check out [fontsquirrel](http://www.fontsquirrel.com/) for an easy source of free fonts. For example, we can download [Chantelli Antiqua](http://www.fontsquirrel.com/fonts/Chantelli-Antiqua) as an example. 

Fonts are stored in the "assets" folder. In Android Studio, `File > New > folder > Assets Folder`. Now download any font and **place the TTF file in the `assets/fonts` directory**:

![](http://i.imgur.com/2dxTeGY.png)

We're going to use a basic layout file with a `TextView`, marked with an id of "custom_font" so we can access it in our code.

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:orientation="vertical"
              android:layout_width="match_parent"
              android:layout_height="match_parent">
 
    <TextView
            android:id="@+id/custom_font"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="This is the Chantelli Antiqua font."
    />
</LinearLayout>
```

To set the custom font manually, open your activity file and insert this into the `onCreate()` method:

```java
// Get access to our TextView
TextView txt = (TextView) FindViewById(R.id.custom_font);
// Create the TypeFace from the TTF asset
Typeface typeface = Typeface.CreateFromAsset(Assets, "fonts/Chantelli_Antiqua.ttf");
//Assign the typeface
view.SetTypeface(typeface, TypefaceStyle.Normal);
```

Alternatively, you can use the third-party [calligraphy library](https://github.com/chrisjenx/Calligraphy):

```
<TextView fontPath="fonts/Chantelli_Antiqua.ttf"/>
```

Either method will will result in:

<img alt="custom" src="http://i.imgur.com/jlTQpEY.png" width="400" />

You'll also want to keep an eye on the total size of your custom fonts, as this can grow quite large if you're using a lot of different typefaces. 


## Using Spans to Style Sections of Text

Spans come in really handy when we want to apply styles to portions of text within the same TextView. We can change the text color, change the typeface, add an underline, etc, and apply these to only certain portions of the text. The [full list of spans](http://developer.android.com/reference/android/text/style/package-summary.html) shows all the available options.

As an example, let's say we have a single TextView where we want the first word to show up in red and the second word to have a strikethrough:
 
![Custom](https://i.imgur.com/X9tKFmv.png)

We can accomplish this with spans using the code below:

```cs
TextView textView = (TextView)FindViewById(Resource.Id.textView);
var firstWord = "Hello";
var secondWord = "World";

var redForegroundColorSpan = new ForegroundColorSpan(Color.Red);

// Use a SpannableStringBuilder so that both the text and the spans are mutable
SpannableStringBuilder ssb = new SpannableStringBuilder(firstWord);

// Apply the color span
ssb.SetSpan(
        redForegroundColorSpan,            	// the span to add
        0,                                 	// the start of the span (inclusive)
        ssb.Length(),                     	// the end of the span (exclusive)
        SpanTypes.ExclusiveExclusive); 		// behavior when text is later inserted into the SpannableStringBuilder
                                            // SPAN_EXCLUSIVE_EXCLUSIVE means to not extend the span when additional
                                            // text is added in later

// Add a blank space
ssb.Append(" ");

// Create a span that will strikethrough the text
StrikethroughSpan strikethroughSpan = new StrikethroughSpan();

// Add the secondWord and apply the strikethrough span to only the second word
ssb.Append(secondWord);
ssb.SetSpan(
        strikethroughSpan,
    ssb.Length() - secondWord.Length,
        ssb.Length(),
    SpanTypes.ExclusiveExclusive);

// Set the TextView text and denote that it is Editable
// since it's a SpannableStringBuilder
textView.SetText(ssb, TextView.BufferType.Editable);
```

Note: There are 3 different classes that can be used to represent text that has markup attached. [SpannableStringBuilder](http://developer.android.com/reference/android/text/SpannableStringBuilder.html) (used above) is the one to use when dealing with mutable spans and mutable text. [SpannableString](http://developer.android.com/reference/android/text/SpannableString.html) is for mutable spans, but immutable text. And [SpannedString](http://developer.android.com/reference/android/text/SpannedString.html) is for immutable spans and immutable text.


## References

* <http://developer.android.com/guide/topics/ui/controls/text.html>
* <http://code.tutsplus.com/tutorials/android-user-interface-design-edittext-controls--mobile-7183>
* <http://www.codeofaninja.com/2012/01/android-edittext-example.html>
* <http://www.tutorialspoint.com/android/android_edittext_control.htm>
* <http://developer.android.com/reference/android/widget/EditText.html>
* <http://android-developers.blogspot.com/2015/10/android-support-library-231.html?linkId=17977963>


[1]: images/viewgroup_hierarchy.png
[2]: images/viewgroup-layout.png
[3]: images/defining-id-layout.png
[4]: images/padding-annotated.png