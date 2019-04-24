# Introduction to Xamarin Android

## Welcome to Xamarin Android Guides

Welcome to the guides to support the Xamarin Android Guides. The guides are intended to be used to support the course.

## Target Audience

- Developers

Some development knowledge is required as most of the tools required reading at code. You don't need to proficient but be in a position
to write and compile programs.

## What is Xamarin Android

![Xamarin.Android uses C#][1]

- Xamarin.Android lets C# developers create native Android apps with the C# language.
- Xamarin.Android provides bindings to the Android libraries that are familiar to the C# developer.
- Xamarin.Android uses the same tools for building and packaging Android apps as Java.
- Development is done in Visual Studio.
- C# features like generics, async/await, LINQ and lambda expressions and are supported.
- Xamarin.Android have access to libraries defined in `java.*`, `android.*` and `Mono.NET`.
- Xamarin.Android also lets use use native Java jars or native C/C++ code using JNI.



```java
EditText input = new EditText(this);
String text = input.getText().toString();
input.addTextChangedListener(new TextWatcher() { ... });
```

```csharp
var input = new EditText(this);
string text = input.Text;
input.TextChanged += (sender, e) => { ... };
```

!!! info
    Java uses get/set methods and listeners, whilst C# uses properties and events.


[1]: images/csharp-xamarin.png