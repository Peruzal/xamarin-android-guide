# Android Styles and Themes

## Drawables

## Images

## Styles

## Themes

## Styling Buttons

A button can styled be by applying a theme, e.g we can style the button so that its `borderless` :

```xml
<Button
    android:id="@+id/button_send"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="@string/button_send"
    android:onClick="sendMessage"
    style="?android:attr/borderlessButtonStyle" />
```

We can also give the button a custom background for the different states :

```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@drawable/button_pressed"
          android:state_pressed="true" />
    <item android:drawable="@drawable/button_focused"
          android:state_focused="true" />
    <item android:drawable="@drawable/button_default" />
</selector>
```

{{< note title="Note" >}}
The xml file needs to be placed in the Resources/drawable folder. The order of the item is important. Android will search them by order, and only apply the button normal state after checking the state_pressed and state_focused.
{{</ note >}}

If you want to customize the background color without changing the accent color in your main theme you can create a custom theme for your Button using the android:theme attribute and extending the ThemeOverlay theme.

```xml
     <Button  
         style="@style/Widget.AppCompat.Button.Colored"  
         android:layout_width="wrap_content"  
         android:layout_height="wrap_content" 
         android:layout_margin="16dp"
         android:theme="@style/MyButtonTheme"/> 
```

defining the following theme:

```xml
 <!-- res/values/themes.xml -->
  <style name="MyButtonTheme" parent="ThemeOverlay.AppCompat.Light"> 
      <item name="colorAccent">@color/my_color</item> 
 </style>
 ```

## Styling TextInputLayout

Make sure you have the `app` namespace (`xmlns:app="http://schemas.android.com/apk/res-auto"` defined in your outer layout.  You can type `appNS` as a shortcut in Android Studio to be declared.

The hint text can be styled by defining `app:hintTextAppearance`, and the error text can be changed with `app:errorTextAppearance.`  The counter text and overflow text can also have their own text styles by defining `app:counterTextAppearance` and `app:counterOverflowTextAppearance`.  We can use `textColor`, `textSize`, and `fontFamily` to help change the color, size, or font:

```xml
<style name="counterText">
  <item name="android:textColor">#aa5353cc</item>
</style>

<style name="counterOverride">
  <item name="android:textColor">#ff0000</item>
</style>
```
