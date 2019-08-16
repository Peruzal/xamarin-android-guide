# Services

## What are Services

Services are used to perform long running tasks. Services do not have a UI.

They are three different types of services:

- **Foreground**: A foreground service performs some operation that is noticeable to the user. For example, an audio app would use a foreground service to play an audio track. Foreground services must display a `Notification`. Foreground services continue running even when the user isn't interacting with the app.
- **Background**: A background service performs an operation that isn't directly noticed by the user. For example, if an app used a service to compact its storage, that would usually be a background service.
- **Bound**: A service is bound when an application component binds to it by calling `BindService()`. A bound service offers a client-server interface that allows components to interact with the service, send requests, receive results, and even do so across processes with interprocess communication (IPC). A bound service runs only as long as another application component is bound to it. Multiple components can bind to the service at once, but when all of them unbind, the service is destroyed.

A service can be started, bound, or both:

- A _started service_ is a service that an application component starts by calling `StartService()` .
Use started services for tasks that run in the background to perform long-running operations. Also use started services for tasks that perform work for remote processes.
- A _bound service_ is a service that an application component binds to itself by calling `BindService()` .
Use bound services for tasks that another app component interacts with to perform interprocess communication (IPC).

!!! caution "Threads in services"
    A service runs in the main thread of its hosting process—the service doesn't create its own thread and doesn't run in a separate process unless you specify that it should. If your service is going to do any CPU-intensive work or blocking operations (such as MP3 playback or networking), create a new thread within the service to do that work

Android defines two types of services:

- `Service`: Normal service that runs on the same thread as the UI thread of the application
- `IntentService`: Inherits from the `Service`.  Automatically provides a worker thread and handles the boilerplate code in the normal server.

Services have a simple life cycle, they can be in either running or stopped state.


## Started services

How a service starts:

1. An application component such as an activity calls startService() and passes in an Intent . The Intent specifies the service and includes any data for the service to use.
2. The system calls the service's onCreate() method and any other appropriate callbacks on the main thread. It's up to the service to implement these callbacks with the appropriate behavior, such as creating a secondary thread in which to work.
3. The system calls the service's onStartCommand() method, passing in the Intent supplied by the client in step 1. (The client in this context is the application component that calls the service.)

## IntentService

Most started services don't need to handle multiple requests simultaneously, and if they did it could be a dangerous multithreading scenario. For this reason, it's probably best if you implement your service using the `IntentService` class.

IntentService is a useful subclass of Service :

- IntentService automatically provides a worker thread to handle your Intent .
- IntentService handles some of the boilerplate code that regular services need (such as starting and stopping the service).
- IntentService can create a work queue that passes one intent at a time to your onHandleIntent() implementation, so you don't have to worry about multi-threading.

To implement IntentService :

1. Provide a small constructor for the service.
2. Create an implementation of onHandleIntent() to do the work that the client provides.

!!! caution "IntentService on Android 8.0"
    Note:IntentService is subject to the new restrictions on background services in Android 8.0 (API 26). For this reason, Android Support Library 26.0.0 introduces a new JobIntentService class, which provides the same functionality as IntentService but uses jobs instead of services when running on Android 8.0 or higher.

## Declaring services in the manifest

The service will need to be registered in the `AndroidManifest.xml`. To register the service, you use the [Service] attribute on the class that derives from the `Service` or `IntentService` class as follows:

```csharp
[Service(Label = "ChatService")]
public class ChatService : Service {
    ...
}
```

## Bound services

A service is _bound_ when an application component binds to it by calling `BindService()`. A bound service offers a client server interface that allows components to interact with the service, send requests, and get results, sometimes using interprocess communication (IPC) to send and receive information across processes. A bound service runs only as long as another application component is bound to it. Multiple components can bind to the service at once, but when all of them unbind, the service is destroyed.

A bound service generally does not allow components to start it by calling `StartService()`.

## Implement a bound service

To implement a bound service, define the interface that specifies how a client can communicate with the service. This interface, which your service returns from the `OnBind() `callback method, must be an implementation of `IBinder` .

To retrieve the `IBinder` interface, a client application component calls `BindService()`. Once the client receives the `IBinder` , the client interacts with the service through that interface.


!!! caution "Implicit intents with bound services"
    Do not use an implicit intent to bind to a service. Doing so is a security hazard, because you can't be certain what service will respond to your intent, and the user can't see which service starts. Beginning with Android 5.0 (API level 21), the system throws an exception if you call bindService() with an implicit Intent .

The default template from the **Add** -> **New File** -> **Service** creates a bound service.

## Life cycle of started services vs. bound services

A service have a simple life cycle. The service can be either in the running state or stopped state.

A bound service exists only to serve the application component that's bound to it, so when no more components are bound to the service, the system destroys it. Bound services don't need to be explicitly stopped the way started services do (using `StopService()` or `StopSelf()`).

The diagram below shows a comparison between the started and bound service lifecycles.

![Service life cycle][1]

## Foreground services

To request that a service run in the foreground, call `StartForeground()` instead of `StartService()`. This method takes two parameters: an integer that uniquely identifies the notification and the `Notification` object for the status bar notification. This notification is ongoing, meaning that it can't be dismissed. It stays in the status bar until the service is stopped or removed from the foreground.

When starting a foreground service, you will need to create a notification that shown to the user.

### Create the notification



## Scheduled services

Android 8.0 imposes restrictions on started services. You might need to use the `WorkManager` class or the `JobScheduler` to run background jobs.

[1]: /images/service-lifecycle.png