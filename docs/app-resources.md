# Understanding Android App Resources

Resource files are a way of separating static values from code so that you don't have to change the code itself to change the values.

Resource files are located in the `Resources` folder. These folders include :

- `drawable`: For images and icons
- `layout`: For layout resource files
- `menu`: For menu items
- `mipmap`: For pre-calculated, optimized collections of app icons used by the Launcher
- `values`: For colors, dimensions, strings, and styles (theme attributes)

## Referencing resources

The syntax to reference a resource in an XML layout is as follows:

`@package_name:resource_type/resource_name`

- `package_name` is the name of the package in which the resource is located. 
- `resource_type` is the `Resources` subclass for the resource type.
- `resource_name` is either the resource filename without the extension, or the `android:name` attribute value in the XML element.

!!! info "Package name not require"
    The package name is not required when you reference resources that are stored in the `Resources` folder of your project, because these resources are from the same package.

For example, the following XML layout statement sets the `android:text` attribute to a string resource:

- `android:text="@string/button_label_toast"`. No package_name is included, because the resource is stored in the `strings.xml` file in the project.
- The `resource_type` is string.
- The `resource_name` is button_label_toast.

## Referencing resources defined in another namespace

In the following example, the XML layout statement sets the `android:textColor` attribute to a color resource. However, the resource is not defined in the project but supplied by Android, so you need to specify the `package_name`, which is android, followed by a colon:

```xml
android:textColor="@android:color/white"
```

## Value resource files

The values resources files are used to keep and easily manage commonly used values e.g colors, dimensions and strings. Its also used to manage resources translated to multiple languages.

### Strings

String resources are located in the strings.xml file in **Resources** -> **values** -> **strings.xml**.

```xml
<resources>
    <string name="app_name">Hello Toast</string>
</resources>
```

The name (for example, app_name) is the resource name you use in your XML code, as in the following attribute:

```xml
android:label="@string/app_name"
```

### Colors

Color resources are located in the colors.xml file **Resources** -> **values** -> **colors.xml**.

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#2c3e50</color>
    <color name="colorPrimaryDark">#1B3147</color>
    <color name="colorAccent">#3498db</color>
</resources>
```

The `name` (for example, `colorPrimary`) is the resource name you use in your XML code:

```xml
android:textColor="@color/colorPrimary"
```

The `color` value of this name is the hexadecimal `color` value (#3F51B5) enclosed within the <color></color> tags. The hexadecimal value specifies red, green, and blue (RGB) values. 

The value always begins with a pound (<kbd>#</kbd>) character, followed by the Alpha-Red-Green-Blue information. For example, the hexadecimal value for black is #000000, while the hexadecimal value for a variant of sky blue is #559fe3. Base color values are listed in the [Colors](https://link) class documentation.


!!! info "Material Design colors"
    The Material Design spec defines three primary colors, the primary dark, primary color and accent color. You can customize these colors to create a uniform UI. You can use [Material Pallette][2] website to generate the colors

### Dimensions

Dimensions are stored in the **Resources** -> **values** -> **dimens.xml**. The `dimens.xml` file can be a folder holding more than one `dimens.xml` file - one for each device resolution.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<resources>
    <dimen name="fab_margin">16dp</dimen>
    <dimen name="default_padding">16dp</dimen>
</resources>
```

The `fab_margin` is used as follows in the layout file :

```xml hl_lines="3"
<android.support.design.widget.FloatingActionButton 
    ...
    android:layout_margin="@dimen/fab_margin" 
    .../>
```

### Other resource files

They are other resources files defined in the `Resources` folder:

- **Images and icons** - The `drawable` folder provides icon and image resources. They are usually various drawable folders for different device densities.
- **Optimized icons** - The `mipmap` folder typically contains pre-calculated, optimized collections of app icons used by the Launcher. 
- **Menus** - You can use an XML resource file to define menu items and store them in your project in the `menu` folder.


[1]: https://developer.android.com/reference/android/graphics/Color.html
[2]: https://www.materialpalette.com/