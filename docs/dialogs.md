# Android Dialogs and Pickers

Android provides controls for the user to pick a time or pick a date as ready-to-use dialogs. Each picker provides controls for selecting each part of the time (hour, minute, AM/PM) or date (month, day, year). Using these pickers helps ensure that your users can pick a time or date that is valid, formatted correctly, and adjusted to the user's locale.

![Date Picker](/images/date-picker.png)


We recommend that you use `DialogFragment` to host each time or date picker. The `DialogFragment` manages the dialog lifecycle for you and allows you to display the pickers in different layout configurations, such as in a basic dialog on handsets or as an embedded part of the layout on large screens.

## Date Picker Dialog

They are two ways of pickinging a date. We can use the `DatePicker` control or we can use a dialog. Using the dialog is the preferred way as the dialog will render differently on mobile and tablets.

### Using a DialogFragment

The `DatePickerDialog` needs fragment to host it and we use the `DialogFragment`. Use the `DialogFragment` from the support library to support older devices.

Define a fragment that inherits from the `AppCompatDialogFragment`.

```cs
class DatePickerFragment : AppCompatDialogFragment {
    //This event will be invoked when we set the date
    public event EventHandler<DatePickerDialog.DateSetEventArgs> DateSet = delegate { };

    //Ovverrice the constructor and create a DatePickerDialog using the current date
    public override Dialog OnCreateDialog(Bundle savedInstanceState)
    {
        return new DatePickerDialog(Context, (sender, e) => { 
            //Invoke the event, once the date have been set
            DateSet(sender, e);
        }, DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
    }
}
```

### Show the Date Picker

We can attach an event to the button and instantiate the fragment and then show it.

```cs
// Get our button from the layout resource,
// and attach an event to it
Button button = FindViewById<Button>(Resource.Id.myButton);

button.Click += delegate {
    var datePicker = new DatePickerFragment();
    //Attach an event to the fragment
    datePicker.DateSet += (sender, e) => { 
        //Show the date on the console
        Console.WriteLine(e.Date);
    };
    //Show the date picker
    //Needs a Support Fragment managing the lifecycle of the fragment
    datePicker.Show(SupportFragmentManager, "datepicker");
};
```

## Time Picker Dialog

![Time Picker](/images/time-picker.png)

The procedure is the same as setting the date, we need to host the `TimerPickerDialog` in a `DialogFragment`.

```cs
class TimePickerFragment : AppCompatDialogFragment
{
    //This event will be invoked when we set the date
    public event EventHandler<TimePickerDialog.TimeSetEventArgs> TimeSet = delegate { };

    //Ovverrice the constructor and create a DatePickerDialog using the current date
    public override Dialog OnCreateDialog(Bundle savedInstanceState)
    {
        return new TimePickerDialog(Context, (sender, e) => {
            TimeSet(sender, e);
        }, DateTime.Now.Hour, DateTime.Now.Minute, true);
    }
}
```

### Hook event to button

We can then hook an event to the button to display the timer picker fragment.

```cs
// Get our button from the layout resource,
// and attach an event to it
Button button = FindViewById<Button>(Resource.Id.myButton);

button.Click += delegate {
    var timePicker = new TimePickerFragment();
    //Attach an event to the fragment
    timePicker.TimeSet += (sender, e) => { 
        //Show the date on the console
        Console.WriteLine($"{e.HourOfDay}:{e.Minute}");
    };
    //Show the date picker
    //Needs a Support Fragment managing the lifecycle of the fragment
    timePicker.Show(SupportFragmentManager, "timepicker");
};
```

## Alert Dialog

We can create an alert dialog using the `AlertDialog` class. The dialog can also be hosted in a `DialogFragment` as we shown above with the date and time picker dialogs.

In this example, we will show an example without hosting the alert dialog inside the `DialogFragment`

```cs
button.Click += delegate {
    var alertDialog = new Android.Support.V7.App.AlertDialog.Builder(this)
                //Set dialog title
                .SetTitle("This is a title")
                //Set the content for th dialog, can be a layout
                .SetMessage("The message of dialog is set here")
                //Set the OK button
                .SetPositiveButton("OK", (sender, e) => { })
                //Set the cancel button
                .SetNegativeButton("Cancel", (sender, e) => { })
                //Create the dialog now that we are finished setting the properties
                .Create();
    //Display the dialog
    alertDialog.Show();
};
```

## Custom Dialog

We can use the `AlertDialog` and instead of using a simple message, we use a custom layout to set its contents.