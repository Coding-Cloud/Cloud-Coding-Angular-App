import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment as env } from '../../../../environments/environment';
import { navigation } from 'src/app/app-routing.module';

@Component({
  selector: 'cc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  releaseButler = 'assets/release-butler.png';
  appName = env.appName;
  navigation = navigation;

  constructor() {}

  ngOnInit() {
    const typeWriter = require('t-writer.js');
    const target = document.querySelector('.tw');

    const writer = new typeWriter(target, {
      loop: true,
      typeSpeed: 50,
      deleteSpeed: 30,
      typeColor: '#69f5ff'
    });

    writer
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
      .rest(5000)
      .start();
  }
}
