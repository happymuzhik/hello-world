import { GithubFollowersService } from './../services/github-followers.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {

  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: GithubFollowersService) { }

  ngOnInit() {

    Observable.combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
    .switchMap( combined => {
      const paramMap = combined[0];
      const queryParamMap = combined[1];
      this.id = +paramMap.get('id');

      return this.service.getAll();
    })
    // .subscribe( followers => {
    //   console.log(followers);
    // });
  }

  submit() {
    this.router.navigate(['/followers'], {
      queryParams: {
        page: 1,
        order: 'newest'
      }
    })
  }

}
