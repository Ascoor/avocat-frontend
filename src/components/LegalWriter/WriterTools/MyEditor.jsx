
import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
import { Card } from 'react-bootstrap';
DocumentEditorContainerComponent.Inject(Toolbar);
const MyEditor = () => {
  const data = [
    {
      OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, ShipCountry: 'France', Freight: 32.38
    },
    {
      OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6, ShipCountry: 'Germany', Freight: 11.61
    },
    {
      OrderID: 10250, CustomerID: 'HANAR', EmployeeID: 4, ShipCountry: 'Brazil', Freight: 65.83
    }
  ];
  return (
    <Card>
      <Card.Body>
        <h1>محرر ملفات الورد</h1>
        <DocumentEditorContainerComponent
          id="container"
          style={{ height: '900px' }}
          serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
          enableToolbar={true}
          // يمكن إضافة المزيد من الخصائص حسب الحاجة
          //
              toolbarSettings={{
                enableRtl: true,
                items: [
                  'Bold', 'Italic', 'Underline', 'StrikeThrough', 'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
                  'LowerCase', 'UpperCase', '|', 'Formats', 'Alignments', 'OrderedList', 'UnorderedList', '|', 'CreateTable',
                  'CreateLink', 'Image', '|', 'ClearFormat', 'Print', 'SourceCode', 'FullScreen', '|',
                  'Undo', 'Redo', '|', 'Indent', 'Outdent', 'CreateTable', '|', 'SubScript', 'SuperScript',
                  'AutoText', 'TableProperties', 'TableCellProperties', 'InsertFunction', 'DeleteFunction', 'InsertTable',
                  'DeleteTable', 'InsertRow', 'DeleteRow', 'InsertColumn', 'DeleteColumn', 'ViewCode', 'ViewOriginal',
                  'ViewHTML'  
                                      ]
          }}

        />
      </Card.Body>
    </Card>
  );
}

export default MyEditor;
