// src/services/ExportService.ts
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';

export type ExportFormat = 'csv' | 'excel' | 'pdf' | 'json' | 'png';

export interface ExportOptions {
  filename?: string;
  sheetName?: string;
  includeTimestamp?: boolean;
  compress?: boolean;
}

export interface ColumnDefinition {
  key: string;
  title: string;
  format?: (value: any) => string;
  width?: number;
}

class ExportService {
  async exportData(
    data: any[],
    columns: ColumnDefinition[],
    format: ExportFormat,
    options: ExportOptions = {}
  ): Promise<void> {
    const timestamp = options.includeTimestamp !== false ? `_${new Date().toISOString().split('T')[0]}` : '';
    const defaultFilename = `export${timestamp}`;
    const filename = options.filename || defaultFilename;

    switch (format) {
      case 'csv':
        await this.exportToCSV(data, columns, `${filename}.csv`);
        break;
      case 'excel':
        await this.exportToExcel(data, columns, `${filename}.xlsx`, options.sheetName);
        break;
      case 'pdf':
        await this.exportToPDF(data, columns, `${filename}.pdf`);
        break;
      case 'json':
        await this.exportToJSON(data, `${filename}.json`, options.compress);
        break;
      case 'png':
        await this.exportToPNG(data, columns, `${filename}.png`);
        break;
    }
  }

  async exportDashboard(elementId: string, filename: string): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) throw new Error('Element not found');

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--bg-primary'),
    });

    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `${filename}_dashboard.png`);
      }
    });
  }

  async exportChart(chartId: string, filename: string): Promise<void> {
    const canvas = document.querySelector(`#${chartId} canvas`) as HTMLCanvasElement;
    if (!canvas) throw new Error('Chart canvas not found');

    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `${filename}.png`);
      }
    });
  }

  async generateReport(
    sections: Array<{
      title: string;
      data: any[];
      columns: ColumnDefinition[];
      type: 'table' | 'chart';
      chartId?: string;
    }>,
    title: string,
    filename: string
  ): Promise<void> {
    const doc = new jsPDF();
    let yPosition = 20;

    // Título
    doc.setFontSize(20);
    doc.text(title, 105, yPosition, { align: 'center' });
    yPosition += 15;

    // Data de geração
    doc.setFontSize(10);
    doc.text(`Gerado em: ${new Date().toLocaleString()}`, 105, yPosition, { align: 'center' });
    yPosition += 20;

    for (const section of sections) {
      // Título da seção
      doc.setFontSize(14);
      doc.text(section.title, 14, yPosition);
      yPosition += 10;

      if (section.type === 'table') {
        const tableData = section.data.map(row =>
          section.columns.map(col => {
            const value = row[col.key];
            return col.format ? col.format(value) : String(value);
          })
        );

        const tableHeaders = section.columns.map(col => col.title);

        autoTable(doc, {
          startY: yPosition,
          head: [tableHeaders],
          body: tableData,
          theme: 'grid',
          styles: { fontSize: 8 },
          headStyles: { fillColor: [41, 128, 185] },
        });

        yPosition = (doc as any).lastAutoTable.finalY + 20;
      } else if (section.type === 'chart' && section.chartId) {
        const canvas = document.querySelector(`#${section.chartId} canvas`) as HTMLCanvasElement;
        if (canvas) {
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = 180;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          if (yPosition + imgHeight > 280) {
            doc.addPage();
            yPosition = 20;
          }

          doc.addImage(imgData, 'PNG', 15, yPosition, imgWidth, imgHeight);
          yPosition += imgHeight + 20;
        }
      }

      // Verificar se precisa de nova página
      if (yPosition > 270 && section !== sections[sections.length - 1]) {
        doc.addPage();
        yPosition = 20;
      }
    }

    doc.save(`${filename}.pdf`);
  }

  private async exportToCSV(data: any[], columns: ColumnDefinition[], filename: string): Promise<void> {
    const headers = columns.map(col => col.title);
    const rows = data.map(row =>
      columns.map(col => {
        const value = row[col.key];
        const formatted = col.format ? col.format(value) : value;
        // Escapar vírgulas e aspas
        return typeof formatted === 'string'
          ? `"${formatted.replace(/"/g, '""')}"`
          : formatted;
      }).join(',')
    );

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob(['\ufeff', csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
  }

  private async exportToExcel(
    data: any[],
    columns: ColumnDefinition[],
    filename: string,
    sheetName = 'Sheet1'
  ): Promise<void> {
    const wsData = [
      columns.map(col => col.title),
      ...data.map(row =>
        columns.map(col => {
          const value = row[col.key];
          return col.format ? col.format(value) : value;
        })
      ),
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    
    // Ajustar largura das colunas
    const colWidths = columns.map(col => ({
      wch: col.width || Math.max(col.title.length, 15),
    }));
    ws['!cols'] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    
    XLSX.writeFile(wb, filename);
  }

  private async exportToPDF(data: any[], columns: ColumnDefinition[], filename: string): Promise<void> {
    const doc = new jsPDF();
    
    const tableData = data.map(row =>
      columns.map(col => {
        const value = row[col.key];
        return col.format ? col.format(value) : String(value);
      })
    );

    const tableHeaders = columns.map(col => col.title);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save(filename);
  }

  private async exportToJSON(data: any[], filename: string, compress = false): Promise<void> {
    const json = compress
      ? JSON.stringify(data)
      : JSON.stringify(data, null, 2);
    
    const blob = new Blob([json], { type: 'application/json' });
    saveAs(blob, filename);
  }

  private async exportToPNG(data: any[], columns: ColumnDefinition[], filename: string): Promise<void> {
    // Criar tabela HTML temporária
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    table.style.width = '100%';
    
    // Cabeçalho
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    columns.forEach(col => {
      const th = document.createElement('th');
      th.textContent = col.title;
      th.style.border = '1px solid #000';
      th.style.padding = '8px';
      th.style.backgroundColor = '#f0f0f0';
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Dados
    const tbody = document.createElement('tbody');
    data.forEach(row => {
      const tr = document.createElement('tr');
      columns.forEach(col => {
        const td = document.createElement('td');
        const value = row[col.key];
        td.textContent = col.format ? col.format(value) : String(value);
        td.style.border = '1px solid #000';
        td.style.padding = '8px';
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    
    document.body.appendChild(table);
    
    // Converter para PNG
    const canvas = await html2canvas(table);
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, filename);
      }
      document.body.removeChild(table);
    });
  }
}

export const exportService = new ExportService();