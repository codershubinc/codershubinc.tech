import React from 'react';
import { skills } from '@/data/skills';
import { Card, CardContent } from '@/components/ui/Card';

export function SkillsGrid() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <Card key={skill.id} className="flex items-center justify-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0 font-semibold text-lg">
                {skill.name}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
