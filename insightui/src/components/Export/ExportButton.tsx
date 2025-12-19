// src/components/Export/ExportButton.tsx
import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Download,
  PictureAsPdf,
  TableChart,
  InsertDriveFile,
  Image,
  DataObject,
  Settings,
  Check,
} from '@mui/icons-material';
import { exportService, ExportFormat, ColumnDefinition } from '../../services/ExportService';

interface ExportButtonProps {
  data: any[];
  columns: ColumnDefinition[];
  title?: string;
  availableFormats?: ExportFormat[];
  onExportStart?: () => void;
  onExportComplete?: (format: ExportFormat) => void;
  onExportError?: (error: Error) => void;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  data,
  columns,
  title = 'Exportar Dados',
  availableFormats = ['csv', 'excel', 'pdf', 'json', 'png'],
  onExportStart,
  onExportComplete,
  onExportError,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('excel');
  const [filename, setFilename] = useState('');
  const [includeTimestamp, setIncludeTimestamp] = useState(true);
  const [compressJSON, setCompressJSON] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [lastExport, setLastExport] = useState<{ format: ExportFormat; time: Date } | null>(null);

  const formatIcons = {
    csv: <TableChart />,
    excel: <TableChart />,
    pdf: <PictureAsPdf />,
    json: <DataObject />,
    png: <Image />,
  };

  const formatLabels = {
    csv: 'CSV',
    excel: 'Excel',
    pdf: 'PDF',
    json: 'JSON',
    png: 'PNG',
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      onExportStart?.();

      await exportService.exportData(
        data,
        columns,
        selectedFormat,
        {
          filename: filename || undefined,
          includeTimestamp,
          compress: compressJSON,
        }
      );

      setLastExport({ format: selectedFormat, time: new Date() });
      onExportComplete?.(selectedFormat);
      setDialogOpen(false);
    } catch (error) {
      console.error('Export failed:', error);
      onExportError?.(error as Error);
    } finally {
      setExporting(false);
    }
  };

  const handleQuickExport = async (format: ExportFormat) => {
    try {
      setExporting(true);
      onExportStart?.();

      await exportService.exportData(data, columns, format, {
        includeTimestamp: true,
      });

      setLastExport({ format, time: new Date() });
      onExportComplete?.(format);
      setAnchorEl(null);
    } catch (error) {
      console.error('Export failed:', error);
      onExportError?.(error as Error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={exporting ? <CircularProgress size={20} /> : <Download />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        disabled={exporting || data.length === 0}
        sx={{ position: 'relative' }}
      >
        Exportar
        {lastExport && (
          <Chip
            label={formatLabels[lastExport.format]}
            size="small"
            sx={{ ml: 1, height: 20 }}
          />
        )}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem disabled>
          <ListItemText primary="Exportação Rápida" secondary="Com configurações padrão" />
        </MenuItem>
        {availableFormats.map((format) => (
          <MenuItem
            key={format}
            onClick={() => handleQuickExport(format)}
            disabled={exporting}
          >
            <ListItemIcon>{formatIcons[format]}</ListItemIcon>
            <ListItemText primary={formatLabels[format]} />
            {lastExport?.format === format && (
              <Check fontSize="small" sx={{ ml: 2 }} />
            )}
          </MenuItem>
        ))}
        <MenuItem onClick={() => {
          setDialogOpen(true);
          setAnchorEl(null);
        }}>
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary="Configurações Avançadas" />
        </MenuItem>
      </Menu>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              select
              label="Formato"
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value as ExportFormat)}
              SelectProps={{
                native: true,
              }}
            >
              {availableFormats.map((format) => (
                <option key={format} value={format}>
                  {formatLabels[format]}
                </option>
              ))}
            </TextField>

            <TextField
              label="Nome do arquivo"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="nome-do-arquivo"
              helperText="Sem extensão (ela será adicionada automaticamente)"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={includeTimestamp}
                  onChange={(e) => setIncludeTimestamp(e.target.checked)}
                />
              }
              label="Incluir data no nome do arquivo"
            />

            {selectedFormat === 'json' && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={compressJSON}
                    onChange={(e) => setCompressJSON(e.target.checked)}
                  />
                }
                label="Comprimir JSON (sem formatação)"
              />
            )}

            <Alert severity="info">
              Exportando {data.length} registros
              {columns.length > 0 && ` com ${columns.length} colunas`}
            </Alert>

            {lastExport && (
              <Alert severity="success">
                Última exportação: {formatLabels[lastExport.format]} às{' '}
                {lastExport.time.toLocaleTimeString()}
              </Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button
            onClick={handleExport}
            variant="contained"
            startIcon={exporting ? <CircularProgress size={20} /> : <Download />}
            disabled={exporting || data.length === 0}
          >
            {exporting ? 'Exportando...' : 'Exportar'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExportButton;