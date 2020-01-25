import { Component, OnInit } from '@angular/core';
import { NewsListService } from './news-list.service';
import { FormGroup, FormBuilder } from "@angular/forms";


@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  form: FormGroup;

  scienceNews: {
    results: [],
    section: ''
  };
  technologyNews: {
    results: []
  };
  flag: any;
  newsList: any;

  constructor(
    private service: NewsListService,
    private formBuilder: FormBuilder,

  ) { }

  async ngOnInit() {
    this.form = this.formBuilder.group({
      section: [null, null],
      itens: [null, null],
      page: [null, null],
      // password: [null, null]
    });

    this.form.valueChanges.subscribe(val => {
      this.mountList(val)
      this.paginator(val)
    });
    this.scienceNews = await this.getNewsData('Science');
    this.technologyNews = await this.getNewsData('Technology');
    this.form.patchValue({ itens: 15, section: 'All' })
  }

  mountList(value) {
    const science = this.scienceNews;
    const tech = this.technologyNews;
    const key = value.section || 'All'
    if (key === 'All' && this.flag !== key || !this.flag
    ) {
      this.newsList = this.shuffle(science.results.concat(tech.results));
      this.flag = key;
    } else {
      this.newsList = science.section === key ? science.results : tech.results
      this.flag = key;
    }
  }



  getNewsData(type: String): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.news(type).subscribe(res => {
        console.log(res);
        resolve(res);
        // this.news = res;
      }, err => { })
    })
  }

  shuffle(arr) {
    for (
      let j, x, i = arr.length;
      i;
      j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x
    );
    return arr;
  }

  paginator(e) {
    const { page, itens } = e;
    const currentPage = page || 0;
    let arr = this.newsList, start = currentPage, end = currentPage + (itens - 1);
    this.newsList = arr.filter((e, i) => i >= start && i <= end);
  }



}
