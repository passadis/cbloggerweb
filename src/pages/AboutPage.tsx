
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Linkedin, Youtube, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-white to-blue-50/50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                About <span className="text-gradient">CloudBlogger</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                The story behind our blog and the person who made it happen
              </p>
            </div>
          </div>
        </section>

        {/* Author Section */}
        <section className="py-10">
          <div className="container">
            <Card className="overflow-hidden border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                  <div className="flex flex-col items-center gap-6 lg:w-1/3">
                    <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20">
                      <img 
                        src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format&fit=crop" 
                        alt="Konstantinos" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Microsoft MVP Badge */}
                    <div className="flex flex-wrap justify-center gap-4">
                      <div className="w-32 h-32">
                        <img 
                          src="/lovable-uploads/a9c3df27-61f8-4afb-98a4-a3af7dd8bd40.png" 
                          alt="Microsoft Certifications" 
                          className="w-full"
                        />
                      </div>
                      <div className="w-32 h-32">
                        <img 
                          src="/lovable-uploads/0327a76e-d544-4dee-b336-efea48bfa3d1.png" 
                          alt="Microsoft MVP Badge" 
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 lg:w-2/3">
                    <h2 className="text-3xl font-semibold mb-6">About the Author</h2>
                    <div className="prose prose-blue max-w-none">
                      <p className="text-lg">
                        Hello! My name is Konstantinos and I live in Athens, Greece. I am a passionate IT Professional with more than 20 years of working experience, starting my first job as a Technician for Microsoft Servers, Windows and Networks.
                      </p>
                      <p className="text-lg mt-4">
                        Being a Tech enthusiast I have been engaged into several Information Technology projects such as Desktop and Server technician, Networks and Infrastructure, Voice over IP, I was even a Digital Press Printer Operator-Technician for some months!
                      </p>
                      <p className="text-lg mt-4">
                        Always followed Microsoft's innovations and Azure along with Office 365 literally stole my heart! You can find me working on DevOps projects or helping a friend configure a WI-Fi VPN router, deploying and building Infrastructure, and of course Learning.
                      </p>
                      <p className="text-lg mt-4">
                        This Blog is dedicated to all the people of IT who spread their knowledge and expertise, shared valuable experience and helped others like me to evolve!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-6xl font-serif text-gray-300 mb-4">"</div>
              <blockquote className="text-xl md:text-2xl italic text-gray-700 mb-6">
                There is no end to education. It is not that you read a book, pass an examination, and finish with education. The whole of life, from the moment you are born to the moment you die, is a process of learning.
              </blockquote>
              <cite className="text-lg font-medium">— Jiddu Krishnamurti</cite>
              
              <div className="mt-12">
                <Separator className="max-w-xs mx-auto mb-8" />
                <div className="flex justify-center gap-8">
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn Profile">
                    <Linkedin size={32} />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube Channel">
                    <Youtube size={32} />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Meetup Events">
                    <Users size={32} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
