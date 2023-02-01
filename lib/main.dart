import 'package:flutter/material.dart';
import 'package:google_docs_clone/models/error_model.dart';
import 'package:google_docs_clone/repository/auth_repository.dart';
import 'package:google_docs_clone/router.dart';
import 'package:google_docs_clone/screens/home_screen.dart';
import 'package:google_docs_clone/screens/login_screen.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:routemaster/routemaster.dart';
void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends ConsumerStatefulWidget {
  const MyApp({super.key});

  @override
  ConsumerState<MyApp> createState() => _MyAppState();
}

class _MyAppState extends ConsumerState<MyApp> {
  // This widget is the root of your application.
  ErrorModel? errorModel;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getUserData();
  }
  void getUserData() async {
    errorModel=await ref.read(authRepositoryProvider).getUserData();
    if(errorModel != null && errorModel!.data != null){
      ref.read(userProvider.notifier).update((state) => errorModel!.data);
    }
  }
  @override
  Widget build(BuildContext context) {

    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      routerDelegate: RoutemasterDelegate(routesBuilder: (context){
        final user =ref.watch(userProvider);
        if(user != null && user.token.isNotEmpty){
          return loggedInRoute;
        }

        return loggedOutRoute;
      }),
      routeInformationParser: const RoutemasterParser(),// for routing purpose we use routemaster
      // home: user == null ?const LoginScreen():const HomeScreen(),
    );
  }
}
