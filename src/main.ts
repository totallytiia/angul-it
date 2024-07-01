import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routing.module';


bootstrapApplication(AppComponent,
  {
    providers:[
      importProvidersFrom(
        RouterModule.forRoot(routes)
      ),
      provideAnimations(),
    ]
  });