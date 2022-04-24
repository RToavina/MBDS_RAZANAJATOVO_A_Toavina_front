import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AssignmentsService} from 'src/app/shared/assignments.service';
import {Assignment} from '../assignment.model';
import {Matiere} from "../../shared/model/matiere";

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  nomAssignment!: string;
  dateDeRendu!: Date;
  auteur?: string;
  matiere?: Matiere;
  note?: number;
  remarque?: string;
  matieres?: Matiere[];

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    // ici un exemple de récupération des query params et du fragment
    let queryParams = this.route.snapshot.queryParams;
    console.log("Query params :")
    console.log(queryParams);
    console.log("Fragment :")
    console.log(this.route.snapshot.fragment);
    this.matieres = this.assignmentsService.matieres;
    this.getAssignment();
  }

  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = +this.route.snapshot.params['id'];

    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      if (!assignment) return;

      this.assignment = assignment;

      // Pour pré-remplir le formulaire
      this.nomAssignment = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
      this.auteur = assignment?.auteur;
      this.matiere = this.matieres?.find(x => x.name === assignment?.matiere);
      this.note = assignment?.note;
      this.remarque = assignment?.remarque;

    });
  }

  onSaveAssignment() {
    if (!this.assignment) return;

    // on récupère les valeurs dans le formulaire
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.auteur = this.auteur;
    this.assignment.matiere = this.matiere?.name;
    this.assignment.note = this.note;
    this.assignment.remarque = this.remarque;

    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((reponse) => {
        console.log(reponse.message);

        // navigation vers la home page
        this.router.navigate(['/home']);
      });
  }
}
