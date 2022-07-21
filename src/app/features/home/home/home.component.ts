import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment as env } from '../../../../environments/environment';
import { navigation } from 'src/app/app-routing.module';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'cc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  appName = env.appName;
  navigation = navigation;

  languages: { name: string; techno: string; imgClass: string }[] = [
    {
      name: 'React 18',
      techno: 'TypeScript 4',
      imgClass: 'react-image'
    },
    {
      name: 'Angular 14',
      techno: 'TypeScript 4',
      imgClass: 'angular-image'
    },
    {
      name: 'Quarkus 2.8.2',
      techno: 'Java 17',
      imgClass: 'quarkus-image'
    }
  ];

  options1: AnimationOptions = {
    path: 'assets/71619-coding.json'
  };

  options2: AnimationOptions = {
    path: 'assets/79736-web-server.json'
  };

  options3: AnimationOptions = {
    path: 'assets/56922-code-typing-concept.json'
  };

  constructor() {}

  ngOnInit() {
    const typeWriter = require('t-writer.js');

    this.writer1(typeWriter);
    this.writer2(typeWriter);
    this.writer3(typeWriter);
  }

  private writer1(typeWriter: any) {
    const target = document.querySelector('.tw1');

    const writer1 = new typeWriter(target, {
      loop: true,
      typeSpeed: 50,
      deleteSpeed: 30,
      typeColor: '#69f5ff'
    });

    writer1
      .type('Coder dans votre langage')
      .rest(1500)
      .remove(7)
      .rest(200)
      .type('framework')
      .rest(1500)
      .clear()
      .type('Voir vos changements en temps réel')
      .rest(1500)
      .remove(13)
      .rest(200)
      .type('grâce à une url partageable')
      .rest(2000)
      .clear()
      .type('Partager votre code à vos amis')
      .rest(1500)
      .remove(8)
      .rest(200)
      .type('votre organisation')
      .rest(1500)
      .remove(18)
      .rest(200)
      .type('tout le monde')
      .rest(1500)
      .clear()
      .type('Commenter vos projets')
      .rest(1500)
      .remove(11)
      .rest(200)
      .type('les projets publiques')
      .rest(2000)
      .clear()
      .start();
  }

  private writer2(typeWriter: any) {
    const target = document.querySelector('.tw2');

    const writer2 = new typeWriter(target, {
      loop: true,
      typeSpeed: 50,
      deleteSpeed: 30,
      typeColor: '#69f5ff'
    });

    writer2
      .rest(300)
      .type('Solide')
      .rest(1500)
      .clear()
      .rest(200)
      .type('Moderne')
      .rest(1500)
      .clear()
      .rest(200)
      .type('Propulsé par kubernetes')
      .rest(1500)
      .clear()
      .rest(200)
      .type('Supportée par un cluster de 4 noeuds')
      .rest(1500)
      .clear()
      .rest(200)
      .type('Avec vos données en sécurité')
      .rest(1500)
      .remove(11)
      .type('sauvegardés à plusieurs endroits')
      .rest(2000)
      .clear()
      .start();
  }

  private writer3(typeWriter: any) {
    const target = document.querySelector('.tw3');

    const writer3 = new typeWriter(target, {
      loop: true,
      typeSpeed: 70,
      deleteSpeed: 50,
      typeColor: '#69f5ff'
    });

    writer3
      .rest(150)
      .type('Angular')
      .rest(1500)
      .clear()
      .rest(200)
      .type('NgRx')
      .rest(1500)
      .clear()
      .rest(200)
      .type('NestJS')
      .rest(1500)
      .clear()
      .rest(200)
      .type('PostgreSQL')
      .rest(1500)
      .clear()
      .rest(200)
      .type('Python')
      .rest(1500)
      .clear()
      .rest(200)
      .type('')
      .start();
  }
}
