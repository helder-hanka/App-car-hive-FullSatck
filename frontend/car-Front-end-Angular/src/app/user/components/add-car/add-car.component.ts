import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../../cars/services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-car',
  imports: [SharedModule],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.scss',
})
export class AddCarComponent implements OnInit {
  mainForm!: FormGroup;
  successMsg: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.initMainForm();
  }

  private initMainForm(): void {
    this.mainForm = this.fb.group({
      immatriculation: ['', [Validators.required]],
      modele: ['', [Validators.required]],
      marque: ['', [Validators.required]],
      color: ['#FFFFFF', [Validators.required]],
      annee: ['', [Validators.required]],
      nomGarage: ['', [Validators.required]],
      adresseGarage: ['', [Validators.required]],
      telephoneGarage: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
    });
  }

  onSubmitForm() {
    if (this.mainForm.valid) {
      const newMainForm = {
        ...this.mainForm.value,
        annee: this.formatDate(this.mainForm.value.annee),
      };
      this.carService.addCar(newMainForm).subscribe({
        next: (addCar) => {
          this.successMsg = 'Voiture ajouter avec succés !';
          this.errorMessage = '';
          this.mainForm.reset();
        },
        error: (err) => {
          this.errorMessage = err
            ? err.error['error']
            : "Une erreur est survenue lors de l'ajout de la voiture.";
          this.successMsg = '';
        },
      });
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      this.successMsg = '';
    }
  }

  private formatDate(rawDate: Date): string {
    if (rawDate) {
      const dateObj = new Date(rawDate);
      const year = dateObj.getFullYear();
      const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
      const day = ('0' + dateObj.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }
    return ''; // Default return value if rawDate is falsy
  }
}
