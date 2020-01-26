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
  error: Boolean;
  loading: Boolean;
  flag: any;
  newsList: any;
  contentArray: any;
  pageItens: any;

  constructor(
    private service: NewsListService,
    private formBuilder: FormBuilder,

  ) { }

  async ngOnInit() {
    this.form = this.formBuilder.group({
      section: [null, null],
      page: [null, null],
    });

    this.form.valueChanges.subscribe(val => {
      this.mountList(val)
      this.paginator(val)
    });
    this.loading = true;
    this.scienceNews = await this.getNewsData('Science');
    this.technologyNews = await this.getNewsData('Technology');
    this.loading = false;
    this.form.patchValue({ itens: 15, section: 'All' })
  }

  mountList(value) {
    const science = this.scienceNews;
    const tech = this.technologyNews;
    const key = value.section || 'All'
    if (key === 'All' && this.flag !== key || !this.flag
    ) {
      this.contentArray = science.results.concat(tech.results);
      this.flag = key;
    } else if (key !== 'All') {
      this.contentArray = science.section === key ? science.results : tech.results;
      this.flag = key;
    }
  }



  getNewsData(type: String): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.news(type).subscribe(res => {
        resolve(res);
      }, err => {
        this.loading = false;
        this.error = true;
      })
    })
  }

  changePage(page) {
    this.form.get("page").setValue(page + 1)
  }

  paginator(e) {
    const { page } = e;
    const itens = 15;
    const currentPage = page || 1;
    let arr = this.contentArray, end = (currentPage * itens) - 1, start = end - (itens - 1);
    const numberItens = Math.round(this.contentArray.length / itens)
    this.pageItens = [...Array(numberItens)]
    this.newsList = arr.filter((e, i) => i >= start && i <= end);
  }



}
