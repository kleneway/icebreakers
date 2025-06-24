import React from "react";
import ClientProvider from "@/components/ClientProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

async function getSession() {
  try {
    const session = await getServerSession(authOptions);
    return session;
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
}

export default async function Page() {
  const session = await getSession();

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* {session && <NavigationBar />} */}

      <main className="flex-1 flex flex-col w-full mx-auto">
        <ClientProvider>
          <div className="flex-1 flex items-start justify-center  bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950">
            {session ? (
              // Authenticated View
              <section className="max-w-7xl w-full space-y-8 animate-fade-in">
                <div className="text-center py-12">
                  <h1 className="text-4xl font-bold mb-8">Welcome {session.user?.name}!</h1>
                  <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-12">
                    Ready to play some icebreaker games?
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Beat Drop Guess Game Card */}
                    <Link href="/games/beat-drop-guess">
                      <div className="group bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl p-6 text-white hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                        <div className="text-4xl mb-4">🎵</div>
                        <h3 className="text-xl font-bold mb-2">Beat Drop Guess</h3>
                        <p className="text-purple-100 text-sm mb-4">
                          Listen to song snippets and guess the title or artist before the beat drops!
                        </p>
                        <div className="flex items-center gap-2 text-purple-200 text-sm">
                          <span>Music & Technology</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>

                    {/* Coming Soon Cards */}
                    <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-6 opacity-60">
                      <div className="text-4xl mb-4">🧠</div>
                      <h3 className="text-xl font-bold mb-2">Neural Network Pictionary</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                        Draw concepts that AI would struggle with!
                      </p>
                      <div className="text-neutral-500 text-sm">Coming Soon</div>
                    </div>

                    <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-6 opacity-60">
                      <div className="text-4xl mb-4">🔍</div>
                      <h3 className="text-xl font-bold mb-2">Code Detective</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                        Guess the missing code in programming snippets!
                      </p>
                      <div className="text-neutral-500 text-sm">Coming Soon</div>
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              // Marketing View
              <section className="max-w-7xl w-full space-y-8 animate-fade-in">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <h1 className="text-4xl font-bold mt-10">
                    Welcome - Click the button below to get started
                  </h1>
                  <Link
                    href="/auth/signin"
                    className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg px-8 py-4 text-lg font-medium shadow-lg shadow-blue-500/20 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </section>
            )}
          </div>
        </ClientProvider>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            © {new Date().getFullYear()} All Rights Reserved
          </span>
          <div className="flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
            <Link
              href="/privacy"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
