/**
 * Opciones del menu de la izquierda, sirven como opciones y como
 * grupo de opciones.
 */
export interface IMenuOption {
  Icon: string;
  Label: string;
  Description: string;
  Order: number;
  Options: IMenuOption[];
  Resource: string;
}
