# Android Fragments

Fragments are like activities but they have to be hosted inside an Activity. The fragments contains a layout file and backing .cs file. In addition to the Activity life cycle methods, Fragments have their own life cycle methods.

Fragments can be swapped during runtime, this enables creating dynamic UIs. The fragment class inherits from `Fragment`.

!!! info "Fragment in different Android namespace"
    Please not that when using the support libraries you will need to use the Fragment from the support libraries, `Android.Support.V4.App.Fragment` not the one from `Android.App.Fragment`

## Create fragment

From Visual Studio add new File and choose Fragment. Visual Studio will create the following for you:

```csharp
public class CoursesFragment : Android.Support.V4.App.Fragment
{
    public override void OnCreate(Bundle savedInstanceState)
    {
        base.OnCreate(savedInstanceState);

        // Create your fragment here
    }

    public override View OnCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState)
    {
        // Use this to return your custom view for this Fragment
        // return inflater.Inflate(Resource.Layout.YourFragment, container, false);

        return base.OnCreateView(inflater, container, savedInstanceState);
    }
}
```

## Create the layout file

Create the layout file inside the **Resources** -> **layout**.

!!! info "Naming layout files"
    You should adopt a convention for naming layout files. For layouts used in fragments, you should prefix them with `fragment_<name_of_fragment>`, e.g a fragment called `CoursesFragment` tha layout file should be `fragment_courses.axml`.

## Attach the layout to the fragment

The fragment uses a different method to set the content UI. The `OnCreateView()` method is used set the content view for the fragment.

Uncomment the line or add a new line to inflate the layout file as follows:

```csharp
var fragmentView = inflater.Inflate(Resource.Layout.fragment_courses, container, false);
```

The complete method will be as follows:

```csharp
public override View OnCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState)
{
    base.OnCreateView(inflater, container, savedInstanceState);
    // Use this to return your custom view for this Fragment
    var fragmentView = inflater.Inflate(Resource.Layout.fragment_courses, container, false);
    return fragmentView;
}
```

## Attach the fragment statically in the activity

They are two ways to attach the fragment in the Activity. You can statically attach the fragment in the `Activity`'s xml file or dynamically add it in code. 

!!! info "Statically attached fragment cannot be changed"
    When you statically attach the fragment in the `Activity`'s xml file, you can not later swap out the fragment.

### Add the fragment in the xml file

You should add the fragment in the xml file of the activity as follows:

```xml
<fragment
    android:id="@+id/fragment"
    class="Challenge01.CoursesFragment"
    android:layout_width="match_parent" 
    android:layout_height="wrap_content" />
```

The `fragment` tag is used to attach the fragment in the xml file. The `class` attribute should be the fully qualified name of the class for the fragment. The `android:id` is required attribute when using fragments in the xml file.

## Dynamically attach the fragment

You can add or remove a fragment dynamically to a container in the xml file. First define a ui with and `android:id` to be used to add the fragment. A `FrameLayout` is generally used but you can use an type of container.


### Create the xml tag

Add the xml tag to be used to show the contents of the fragment in the activity layout file as follows:

```xml
<FrameLayout 
    android:id="@+id/container" 
    android:layout_width="match_parent" 
    android:layout_height="wrap_content" />
```

### Add the fragment in code

In the `OnCerate()` method of the activity dynamically add the fragment using the `SupportFragmentManager` as follows:

```csharp
var fragment = new CoursesFragment();

SupportFragmentManager // Get the support fragment manager instead of the FragmentManager
    .BeginTransaction() // Start a transaction
    .Add(Resource.Id.container, fragment, "coursesFragment") // Add the fragment
    .Commit(); // Commit the changes
```

!!! question "Which fragment manager to use?"
    When using the fragments from the support library, `Android.Support.V4.App.Fragment`, you should use the `SupportFragmentManager` property and when using the fragments from `Android.App.Fragment`, you should use the the `FragmentManager`.

You can perform multiple fragment operations by using transactions. Whe you are done you call the `Commit()` method to apply the changes.