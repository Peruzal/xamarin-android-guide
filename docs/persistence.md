# Persistence in Android

## Shared Preferences

You can use shared preferences to save arbitrarily data on the device.

!!! caution "Saving sensitive information"
    Please do not save sensitive information in shared preferences since they are stored in plain text files on the device.

To save preferences you use the `ISharedPreferences` interface.

### Get the default shared preferences

The default shared preferences are saved in a file thats prefixed your your app's package name. To get the default shared preferences use the the `SharedPreferenceManager` class as follows:

```csharp
var sharedPreferences = PreferenceManager.GetDefaultSharedPreferences(this);
```

Then you can use the `ISharedPreferencesEditor` to add the preferences as follows:

```csharp
var editor = sharedPreferences.Edit();
```

You can now use the editor to put the preferences using a key/value pair as follows :

```csharp
editor.PutString("NICKNAME", "joseph");
```

You should call `Commit()` or `Apply()` when done to apply the change. `Apply()` commits the changes asynchronously.

### Creating a shared preference file

You can also create a named shared preferences file instead of using the default one.  You use the `GetSharedPreferences()` method and supply a name of the preferences file and the mode to create it as follows:

```csharp
var namesSharedPrefs = GetSharedPreferences("colors", FileCreationMode.Private);
```

You can perform the same operations as with the default shared preferences.

### Restoring shared preferences

To get the shared preferences, first get the shared preference and use the various get methods to retrieve the preferences as follows:

```csharp
var nickname = sharedPreferences.GetString("NICKNAME", "defaultValue");
```

You need to specify a default value if the preference is not found.

### Clearing shared preferences

You can clear all the preferences by calling the `Clear()` method on the  `ISharedPreferenceEditor` of the shared preferences as follows:

```csharp
sharedPreferences.Edit().Clear().Apply();
```

We also called `Apply()` to commit the changes.

### Listening for preference changes

You can register a listener to be notified when the preferences changes using the `RegisterOnSharedPreferenceChangeListener()` method on the shared preferences. You will need to implement the interface `ISharedPreferencesOnSharedPreferenceChangeListener` as follows:

```csharp
PreferenceManager.GetDefaultSharedPreferences(this).RegisterOnSharedPreferenceChangeListener(this);
```

and then implementing the interface on the activity as follows :

```csharp
public class LoginActivity : AppCompatActivity, ISharedPreferencesOnSharedPreferenceChangeListener {
    public void OnSharedPreferenceChanged(ISharedPreferences sharedPreferences, string key)
    {
        ...
    }
}
```

## Adding a Setting Screen Using PreferenceFragmentCompat

They are several ways to add a Settings/Preference Screen to your app :

1. Use the PreferenceActivity
2. Use the PreferenceFragment
3. Use the PreferenceFragmentCompat

## Adding an xml Resource File

For both methods you will need an an xml resource file to be added into the Resources folder under the xml directory.

1. Create the xml folder if it does not yet exists under the Resources directory
2. Create a new xml resource file into the just created xml resource directory or use the existing one.
3. Add the preferences. The preferences have the equivalent names to their views with the additional Preference suffix, e.g to add an EditText preference you use EditTextPreference. Also preferences use keys instead of id since they are stored as key/value pairs

**Resources/xml/prefs.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<PreferenceScreen xmlns:android="http://schemas.android.com/apk/res/android">
    <PreferenceCategory android:title="General">
        <EditTextPreference
            android:key="nickname"
            android:title="Nickname" />
    </PreferenceCategory>
    <PreferenceCategory android:title="Notifications">
        <SwitchPreference
            android:title="Notifications"
            android:summary="Get notifications when you receive messages"
            android:key="notifications"
            android:defaultValue="true" />
        <RingtonePreference
            android:defaultValue="content://settings/system/notification_sound"
            android:dependency="notifications"
            android:key="user_joined"
            android:title="User Joined"
            android:summary="Alert for when a user joins the chat"
            android:ringtoneType="notification" />
        <RingtonePreference
            android:defaultValue="content://settings/system/notification_sound"
            android:dependency="notifications"
            android:key="user_left"
            android:title="User Left"
            android:summary="Alert for when a user leaves the chat"
            android:ringtoneType="notification" />
        <RingtonePreference
            android:defaultValue="content://settings/system/notification_sound"
            android:dependency="notifications"
            android:key="mew_message"
            android:title="New Message"
            android:summary="Alert for when a new message arrives"
            android:ringtoneType="notification" />
    </PreferenceCategory>
</PreferenceScreen>
```

The settings UI is defined inside the following tags :

```xml
<PreferenceScreen xmlns:android="http://schemas.android.com/apk/res/android">
  ...
</PreferenceScreen>

```

## Adding Categories

We add categories to the settings UI by using the

```xml
<PreferenceCategory android:title="General">
  ...
</PreferenceCategory>
```

### Adding a Switch Preference

```xml
<SwitchPreference
   android:title="Notifications"
   android:summary="Get notifications when you receive messages"
   android:key="notifications"
   android:defaultValue="true" />
```

### Adding a Ringtone Preference

The ringtone preference will load the phone ringtones settings into your settings screen and lets the user pick a ringtone. You can also add a default ringtone

```xml
<RingtonePreference
     android:defaultValue="content://settings/system/notification_sound"
     android:dependency="notifications"
     android:key="user_joined"
     android:title="User Joined"
     android:summary="Alert for when a user joins the chat"
     android:ringtoneType="notification" />
```

## Adding a Settings Screen using PreferenceActivity

The easiest way to add a settings screen is to create an activity that inherits from the PreferenceActivity class. We will use the xml resource defined above.

1. Create a new Activity
2. Inherit from PreferenceActivity instead of Activity or AppCompatActivity
3. n the OnCreate method, instead of setting the SetContentView method use AddPreferencesFromResource method. Notice this method is deprecated, so you will need to use the other methods.

**PrefsActivity.cs**

```csharp
[Activity(Label = "PreActivity")]
public class PrefsActivity : PreferenceActivity
{
	protected override void OnCreate(Bundle savedInstanceState)
	{
		base.OnCreate(savedInstanceState);
		AddPreferencesFromResource(Resource.Xml.prefs);
	}
}
```

## Add a Menu option to Open the Settings Screen

You will need to define a menu so you can use it to open the settings screen.

1. Add the menu folder in the Resources folder if one does not yet exist
2. Create a menu.xml file

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">
	<item 
		android:id="@+id/action_menu"
		android:title="Settings" />
</menu>
```

We will use the defined id on the menu to find which menu option have been selected.

Modify the activity you want to be able to access the settings from and create the menu.

**MainActivity.cs**

```csharp
//Create the options menu
public override bool OnCreateOptionsMenu(Android.Views.IMenu menu)
{
	MenuInflater.Inflate(Resource.Menu.menu, menu);
	return base.OnCreateOptionsMenu(menu);
}
```

Handle the menu selection as follows :

```csharp
//Handle the selecting of the options menu
public override bool OnOptionsItemSelected(Android.Views.IMenuItem item)
{
	var id = item.ItemId;
	if (id == Resource.Id.action_menu) { 
		StartActivity(new Android.Content.Intent(this, typeof(PrefsActivity)));
	}
	return true;
}
```

Now when you run you should be able to get an option item called Settings. When click it, the settings screen should load up.

## Adding a Settings Screen Using a PreferenceFragment

Use the following steps to create a settings screen using the PreferenceFragment :

1. Create a class that derives from `PreferenceFragment`
2. In the OnCreate method use the AddPreferenceFromResource method to inflate the preference xml file PrefsFragment.cs
```csharp
public class PrefsFrgament : PreferenceFragment
{
	public override void OnCreate(Bundle savedInstanceState)
    {
        base.OnCreate(savedInstanceState);
        AddPreferencesFromResource(Resource.Xml.prefs);
    }
}
```
3. In the activity you would like to show the preference, replace an exisiting container, usually FrameLayout with the PrefsFragment

**Resources/layout/activity_main.axml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <FrameLayout
        android:id="@+id/content"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />
</LinearLayout>
```

**PrefsActivity.cs**

Use the FragmentManager to replace the FrameLayout with the PrefsFragment

```csharp
FragmentManager
	.BeginTransaction()
	.Replace(Resource.Id.content, new PrefsFragment())
	.Commit();
```

**PrefsActivity.cs**

```csharp
using Android.App;
using Android.OS;
using Android.Support.V4.App;
using Android.Support.V7.App;
using Android.Views;

namespace sharedPreferenceDemo
{
	[Activity(Label = "PrefsActivity", Theme = "@style/AppTheme", ParentActivity = typeof(MainActivity))]

	[MetaData("android.support.PARENT_ACTIVITY", Value = "md51c3958e33f8e72dae9076079df527ba2.MainActivity")]

	public class PrefsActivity : AppCompatActivity
	{
		protected override void OnCreate(Bundle savedInstanceState)
		{
			base.OnCreate(savedInstanceState);
			SetContentView(Resource.Layout.activity_prefs);
			FragmentManager
				.BeginTransaction()
				.Replace(Resource.Id.content, new PFrgament())
				.Commit();

			if (SupportActionBar != null) { 
				SupportActionBar.SetDisplayHomeAsUpEnabled(true);
			}
		}

		public override bool OnOptionsItemSelected(IMenuItem item)
		{
			if (item.ItemId == Android.Resource.Id.Home) { 
				NavUtils.NavigateUpFromSameTask(this);
			}
			return base.OnOptionsItemSelected(item);
		}
	}
}
```

### Adding Up Arrow for Back Navigation

In the Oncreate method we check if we have an ActionBar and set the up arrow to display :

```csharp
if (SupportActionBar != null) { 
	SupportActionBar.SetDisplayHomeAsUpEnabled(true);
}
```

Then we handle the clicking of the up arrow in the OnOptionsItemSelected methods :

```csharp
public override bool OnOptionsItemSelected(IMenuItem item)
{
	if (item.ItemId == Android.Resource.Id.Home) { 
		NavUtils.NavigateUpFromSameTask(this);
	}
	return base.OnOptionsItemSelected(item);
}

```

### Adding a Parent Activity

In oder to go back to a parent activity when we click the up arrow, we need to add attribute to the activity. We specify the ParentActivity

```xml
[Activity(Label = "PrefsActivity", Theme = "@style/AppTheme", ParentActivity = typeof(MainActivity))]
```

For this to also work on older devices, we have to use a MetaData attribute and use the the name as android.support.PARENT_ACTIVITY and the value to be fully qualified name of the activity to navigate back to.

```xml
[MetaData("android.support.PARENT_ACTIVITY", Value = "md51c3958e33f8e72dae9076079df527ba2.MainActivity")]
```

You can find the MD5Sum, `md51c3958e33f8e72dae9076079df527ba2` of the activity by check the generated `AndroidManifest.xml` file in the obj folder
