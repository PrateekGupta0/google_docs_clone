import 'dart:async';
import 'package:google_docs_clone/repository/auth_repository.dart';
import 'package:flutter/material.dart';
import 'package:google_docs_clone/colors.dart';
import 'package:google_docs_clone/screens/home_screen.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:routemaster/routemaster.dart';

class LoginScreen extends ConsumerWidget {
  const LoginScreen({Key? key}) : super(key: key);

  void signInWithGoogle(WidgetRef ref, BuildContext context) async {
    final navigator=Navigator.of(context);
    final errormodel =
        await ref.read(authRepositoryProvider).signInWithGoogle();
    if (errormodel.error == null) {
      ref.read(userProvider.notifier).update((state) => errormodel.data);
      Routemaster.of(context).replace('/');
    }
    else{
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(errormodel.error!)));
    }
    // final sMessenger = ScaffoldMessenger.of(context);
    // final navigator = Routemaster.of(context);
    // final errorModel = await ref.read(authRepositoryProvider).signInWithGoogle();
    // if (errorModel.error == null) {
    //   ref.read(userProvider.notifier).update((state) => errorModel.data);
    //   navigator.replace('/');
    // } else {
    //   sMessenger.showSnackBar(
    //     SnackBar(
    //       content: Text(errorModel.error!),
    //     ),
    //   );
    // }
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      body: Center(
        child: ElevatedButton.icon(
          onPressed: () => signInWithGoogle(ref, context),
          icon: Image.asset(
            'assets/images/g-logo-2.png',
            height: 20,
          ),
          label: const Text(
            'Sign in with Google',
            style: TextStyle(
              color: kBlackColor,
            ),
          ),
          style: ElevatedButton.styleFrom(
            backgroundColor: kWhiteColor,
            minimumSize: const Size(150, 50),
          ),
        ),
      ),
    );
  }
}
